export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOtpHtml = (otp) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Arial, sans-serif;">

    <div style="max-width: 500px; margin: 40px auto; padding: 30px;
                background-color: #ffffff; border-radius: 12px;
                text-align: center;">

        <h2 style="color: #2563eb; margin-bottom: 10px;">
            Verify Your Email
        </h2>

        <p style="color: #555555; font-size: 15px; line-height: 1.6;">
            Hello,
        </p>

        <p style="color: #555555; font-size: 15px; line-height: 1.6;">
            Use the OTP below to verify your email address.
        </p>

        <div style="margin: 25px 0; padding: 15px;
                    background-color: #eff6ff; border-radius: 8px;
                    font-size: 32px; font-weight: bold;
                    letter-spacing: 8px; color: #2563eb;">
            ${otp}
        </div>

        <p style="color: #555555; font-size: 14px;">
            This OTP is valid for <strong>5 minutes</strong>.
        </p>

        <p style="color: #777777; font-size: 13px; line-height: 1.6;">
            If you did not request this verification code, you can
            safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;">

        <p style="color: #999999; font-size: 12px;">
            © 2026 Gen AI Interview Platform. All rights reserved.
        </p>

    </div>

</body>
</html>
`
};
