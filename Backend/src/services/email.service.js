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




import { Resend } from "resend";

const resend = new Resend('re_6C28ubq8_Lw9eYJU4BF2HZBjSXxp1FPSK');

export const sendEmail = async (to, subject, text, html) => {
  const { data, error } = await resend.emails.send({
    from: process.env.MAIL_FROM || "onboarding@resend.dev",
    to: [to],
    subject,
    text,
    html,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error(error.message || "Failed to send email");
  }

  console.log("Email accepted by Resend:", data.id);

  return data;
};




