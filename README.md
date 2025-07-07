🚀 MERN Authentication Platform

A secure and scalable authentication system built using the MERN stack (MongoDB, Express.js, React, Node.js). This project features Email and Phone OTP verification, account status validation, and modern UI/UX — ideal for production-ready applications or learning full-stack authentication workflows.

🌐 Live Demo: mern-jv68.onrender.com

✨ Features
🔐 User Registration & Login

Email/password based

Phone/OTP based login (via Twilio)

✅ OTP Verification

Email OTP system using custom mailing service

SMS OTP system using Twilio

📬 Email Verification

Email sent on signup for verification

📞 Phone Authentication

Phone number verification via Twilio SMS

👤 JWT-based Authentication

Secure access using jsonwebtoken

🛡️ Protected Routes

Authenticated routes with middleware

💻 Responsive Frontend

Built with React and styled with CSS

🧰 Tech Stack
Technology	Usage
React.js	Frontend UI
Node.js & Express	Backend API
MongoDB & Mongoose	NoSQL Database
JWT	Secure token-based authentication
Twilio	Phone OTP SMS sending
Nodemailer (custom)	Email OTP sending
React Router DOM	Navigation
Axios	API requests
React Toastify	User notifications
dotenv	Environment variables
bcryptjs	Password hashing

🔐 Authentication Flow
User Registers

Enters email/phone and password

Chooses verification method: Email or Phone

OTP Sent

Email → Sends via custom mailer (Nodemailer)

Phone → Sends via Twilio SMS

OTP Verification

User enters OTP

Verified → accountVerified set to true in DB

Login

JWT token issued upon successful login

Access protected routes

📁 Project Structure
bash
Copy
Edit
MERN-AUTH/
├── client/               # React Frontend
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── ...
├── server/               # Node.js Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── utils/
⚙️ Setup Instructions
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/Shubhamsingh168/MERN-Auth.git
cd MERN-Auth
2. Setup Backend
bash
Copy
Edit
cd server
npm install
Create .env file in /server with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number

3. Setup Frontend
bash
Copy
Edit
cd client
npm install
npm start

🛡️ API Routes (Backend)
Route	Method	Description
/register	POST	Register user
/login	POST	Login user
/send-otp	POST	Send OTP (email/phone)
/verify-otp	POST	Verify OTP and activate
/me	GET	Get authenticated user data

📦 Packages Used
Backend: express, mongoose, bcryptjs, jsonwebtoken, nodemailer, twilio, dotenv

Frontend: react, axios, react-router-dom, react-toastify

✅ Deployment
Frontend: Deployed on Vercel

Backend: Hosted on Render

MongoDB Atlas: Cloud DB service

📸 UI Snapshot

📌 Author
Made with ❤️ by Your Name

📄 License
This project is licensed under the MIT License.
