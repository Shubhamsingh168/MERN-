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

    // ✅ 2. Verify connection (no await here!)
    transporter.verify((err, success) => {
      if (err) {
        console.error("❌ SMTP connection failed:", err);
      } else {
        console.log("✅ SMTP connected successfully");
      }
    });

    // 3. Mail options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    };

    console.log("📤 Sending email to:", email);

    // ✅ 4. Send email — wrap in try/catch for extra visibility
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", info.response);
    } catch (mailErr) {
      console.error("❌ Failed to send email via transporter:", mailErr.message);
    }

  } catch (error) {
    console.error("❌ General email setup error:", error.message);
    throw new Error("Failed to send the verification code");
  }
};
