import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, html }) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CampusCare Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    console.log("Email sent successfully.");
  } catch (error) {
    console.error("========== EMAIL ERROR ==========");
    console.error(error);
    throw error;
  }
  // throw new Error("Unable to send email.");
  //}
};

export default sendEmail;
