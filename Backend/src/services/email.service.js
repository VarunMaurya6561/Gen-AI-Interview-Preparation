// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.GOOGLE_USER,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//   },
// });

// // Verify the connection configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });


// // Function to send email
// export const sendEmail = async (to, subject, text, html) => {

//   try {
//     const info = await transporter.sendMail({
//       from: `"Gen AI Interview Platform" <${process.env.GOOGLE_USER}>`, // sender address
//       to, // list of receivers
//       subject, // Subject line
//       text, // plain text body
//       html, // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error
//   }
// };




import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },

  // Fail faster if SMTP cannot establish a connection
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

// Check SMTP connection
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Email server is ready to send messages");
    return true;
  } catch (error) {
    console.error("Email connection failed:", {
      code: error.code,
      command: error.command,
      message: error.message,
    });

    return false;
  }
};

// Send email
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Gen AI Interview Platform" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message accepted by mail server:", info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending email:", {
      code: error.code,
      command: error.command,
      message: error.message,
    });

    // Important: let the controller know the email failed
    throw error;
  }
};
