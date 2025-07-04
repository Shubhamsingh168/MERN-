import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, subject, message }) => {
  try {
    // 1. Create transporter with SMTP config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for SSL (465)
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 2. Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP connected successfully");

    // 3. Mail options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    };

    console.log("📤 Sending email to:", email);

    // 4. Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email sending failed: " + error.message);
  }
};
