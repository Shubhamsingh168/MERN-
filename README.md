# 🚀 MERN Authentication Platform

A secure and scalable authentication system built using the **MERN stack** (MongoDB, Express.js, React, Node.js). This project features **Email and Phone OTP verification**, account status validation, and modern UI/UX — ideal for production-ready applications or learning full-stack authentication workflows.

🌐 **Live Demo**: [mern-jv68.onrender.com](https://mern-jv68.onrender.com)

---

## ✨ Features

- 🔐 **User Registration & Login**
  - Email/password based
  - Phone/OTP based login (via Twilio)

- ✅ **OTP Verification**
  - Email OTP system using custom mailing service
  - SMS OTP system using Twilio

- 📬 **Email Verification**
  - Email sent on signup for verification

- 📞 **Phone Authentication**
  - Phone number verification via Twilio SMS

- 👤 **JWT-based Authentication**
  - Secure access using `jsonwebtoken`

- 🛡️ **Protected Routes**
  - Authenticated routes with middleware

- 💻 **Responsive Frontend**
  - Built with React and styled with CSS

---

## 🧰 Tech Stack

| Technology        | Purpose                        |
|------------------|--------------------------------|
| React.js         | Frontend UI                    |
| Node.js & Express| Backend API                    |
| MongoDB & Mongoose| NoSQL Database                |
| JWT              | Token-based authentication     |
| Twilio           | Phone OTP SMS service          |
| Nodemailer       | Email OTP mailing              |
| React Router DOM | Frontend routing               |
| Axios            | API requests                   |
| React Toastify   | User notifications             |
| dotenv           | Environment variables          |
| bcryptjs         | Password hashing               |

---

## 🔐 Authentication Flow

1. **User Registers**
   - Enters email/phone and password
   - Chooses verification method (Email or Phone)

2. **OTP Sent**
   - Email → Sent via Nodemailer
   - Phone → Sent via Twilio SMS

3. **OTP Verification**
   - User enters OTP
   - If correct, `accountVerified` is set to `true`

4. **Login**
   - JWT token issued upon login
   - Access to protected routes granted

---

## 📁 Project Structure

