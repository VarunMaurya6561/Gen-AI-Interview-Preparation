const userModel = require("../models/user.schema");
const blackListModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { generateOtp, getOtpHtml } = require("../utils/utils");
const { sendEmail } = require("../services/email.service");
const otpModel = require("../models/otp.model");


async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please Provide username, email, password" });
  }


  await userModel.deleteMany({
    email,
    verified: false,
  });

  await otpModel.deleteMany({
    email,
  });

  const isUserAlreadyExist = await userModel.findOne({
    // $or: [{ username }, { email }],
      email
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exist with this email"});
  }

   const isUsernameAlreadyExist = await userModel.findOne({
    // $or: [{ username }, { email }],
      username
  });

  if (isUsernameAlreadyExist) {
    return res.status(400).json({ message: "Username taken"});
  }

  

  const otp = generateOtp();
  const html = getOtpHtml(otp);

  try {
    await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html);
  } catch (error) {
    return res.status(400).json({
      message : "Unable to send otp!"
    })
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });


  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  await otpModel.create({
    email,
    otpHash,
  });

  const detail = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    },
  );

  res.cookie("detail", detail , {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
});

  res.status(201).json({
    message: "Otp Sent",
  });
}

async function verifyEmail(req, res) {
  try {
  const detail = req.cookies.detail;
  const { otp } = req.body;
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const decoded = jwt.verify(detail, process.env.JWT_SECRET);
  const user = await userModel.findById({
    _id: decoded.id,
  });

  const otpDoc = await otpModel.findOne({
    email: user.email,
  });

  if (!otpDoc) {
    return res.status(401).json({
      message: "OTP expired or not found. Please register again.",
    });
  }

  const MAX_ATTEMPTS = 5;

  if (otpDoc.attempts >= MAX_ATTEMPTS) {
    await otpModel.deleteOne({ _id: otpDoc._id });

    return res.status(429).json({
      message: "Too many attempts. Please request a new OTP.",
    });
  }

  if (otpHash !== otpDoc.otpHash) {
    const updatedOtp = await otpModel.findOneAndUpdate(
      {
        _id: otpDoc._id,
        attempts: { $lt: MAX_ATTEMPTS },
      },
      {
        $inc: { attempts: 1 },
      },
      {
        returnDocument: "after",
      },
    );
    if (!updatedOtp || updatedOtp.attempts >= MAX_ATTEMPTS) {
      await otpModel.deleteOne({
        _id: otpDoc._id,
        attempts: { $gte: MAX_ATTEMPTS },
      });

      return res.status(429).json({
        message: "Too many attempts. Please request a new OTP.",
      });
    }

    return res.status(401).json({
      message: `Incorrect OTP. ${MAX_ATTEMPTS - updatedOtp.attempts} attempts remaining.`,
    });
  }

  await userModel.findByIdAndUpdate(decoded.id, {
    verified: true,
  });

  res.clearCookie("detail");

  await otpModel.deleteMany({
    email: user.email,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
});

  res.status(201).json({
    message: "new user registered",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
  } catch (error) {
    return res.status(401).json({
      message: "OTP expired or not found. Please register again.",
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
});

  res.status(200).json({
    message: "User Logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    await blackListModel.create({ token });
  }

  res.clearCookie("token");

  res.status(200).json({
    message: "User loggod-Out",
  });
}

async function getUser(req, res) {
  const user = await userModel.findOne({ _id: req.user.id });

  res.status(200).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = { registerUser, loginUser, logoutUser, getUser, verifyEmail };

