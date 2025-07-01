import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, subject, message }) => {
    try {
        // Create transporter with SMTP config
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for port 465 (SSL), false for 587 (TLS)
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Mail options
        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_MAIL,
            to: email,
            subject: subject,
            html: message,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        
    } catch (error) {
        console.error("❌ Failed to send email:", error.message);
        throw new Error("Failed to send the verification code");
    }
};
