import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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




