import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: `"GetAJob" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};
//working now

//TODO-> mail now is sent when application status is changed,shd also send when user is registered,when user applies for a job(and others also ig think on it)
//TODO-> now working properly also see to make a new email of company and then sending and also how to see if proper gmail address is used so that also shd be seen through
