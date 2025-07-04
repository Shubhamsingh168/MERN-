import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import twilio from "twilio";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Register user controller
export const register = catchAsyncError(async (req, res, next) => {
    try {
        const { name, email, password, phone, verificationMethod } = req.body;

        // Check for missing fields
        if (!name || !email || !password || !phone || !verificationMethod) {
            return next(new ErrorHandler("Please enter all fields", 400));
        }

        // Validate phone number format
        function validatePhoneNumber(phone) {
            const phoneRegex = /^\+91\d{10}$/;
            return phoneRegex.test(phone);
        }

        if (!validatePhoneNumber(phone)) {
            return next(new ErrorHandler("Please enter a valid phone number", 400));
        }

        // Check if a verified user already exists
        const existingUser = await User.findOne({
            $or: [
                { email, accountverified: true },
                { phone, accountverified: true }
            ]
        });
        console.log("existingUser:", existingUser);


        if (existingUser) {
            return next(new ErrorHandler("User already exists", 400));
        }

        // Limit registration attempts for unverified users
        const registrationAttemptsByUser = await User.find({
            $or: [
                { phone, accountverified: false },
                { email, accountverified: false }
            ]
        });

        if (registrationAttemptsByUser.length >= 3) {
            return next(new ErrorHandler("You have exceeded the maximum number of registration attempts (3). Please try again later.", 400));
        }

        // Create user
        const userData = { name, email, password, phone };
        const user = await User.create(userData);

        // Generate verification code
        const verificationCode = await user.generateVerificationCode();
        await user.save();

        // Send code via email or phone
        await sendVerificationCode(verificationCode, email, phone, verificationMethod);

        res.status(200).json({
            success: true,
            message: "User registered successfully. Please verify your account.",
        });

    } catch (error) {
        next(error);
    }
});

// Send verification code via email or phone
async function sendVerificationCode(verificationCode, email, phone, verificationMethod) {
    try {
        if (verificationMethod === 'email') {
            // Create email message HTML
            const message = generateEmailTemplate(verificationCode);
            // Send email with verification code
            await sendEmail({ email, subject: "Account Verification", message });

        } else if (verificationMethod === 'phone') {
            // Convert code to space-separated digits
            const verificationCodeWithSpace = verificationCode.toString().split('').join(' ');
            await client.calls.create({
                twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}. Please use this code to verify your account.</Say></Response>`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone,
            });
        } else {
            throw new ErrorHandler("Invalid verification method", 500);
        }
    } catch (error) {
        throw new ErrorHandler("Failed to send the verification code", 500);
    }
}

// Generate styled HTML email for account verification
function generateEmailTemplate(verificationCode) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Account Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f6f9fc;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 10px;
                    max-width: 500px;
                    margin: auto;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                }
                .code {
                    font-size: 28px;
                    font-weight: bold;
                    color: #2b2b2b;
                    margin: 20px 0;
                    letter-spacing: 4px;
                }
                .footer {
                    font-size: 12px;
                    color: #888888;
                    margin-top: 30px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Verify Your Account</h2>
                <p>Hello,</p>
                <p>Thank you for registering. Please use the following code to verify your account:</p>
                <div class="code">${verificationCode}</div>
                <p>This code is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
                <p>Regards,<br>Your Company Team</p>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;
}

export const verifyOTP = catchAsyncError(async (req, res, next) => {

    const { email, otp, phone } = req.body;

    if (!otp) {
        return next(new ErrorHandler("OTP is required", 400));
    }

    function validatePhoneNumber(phone) {
        const phoneRegex = /^\+91\d{10}$/;
        return phoneRegex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
        return next(new ErrorHandler("Please enter a valid phone number", 400));
    }

    try {
        // Check if user exists with the provided email or phone and is not verified
        const userAllEntries = await User.find({
            $or: [
                { email, accountVerified: false },
                { phone, accountVerified: false }
            ]
        }).sort({ createdAt: -1 });
        console.log("userAllEntries:", userAllEntries);
        if (userAllEntries.length === 0) {
            return next(new ErrorHandler("User not found ", 404));
        }
        let user;

        if (userAllEntries.length > 1) {
            user = userAllEntries[0];


            await User.deleteMany({
                _id: { $ne: user._id },
                $or: [
                    { email: user.email, accountVerified: false },
                    { phone: user.phone, accountVerified: false }
                ]
            });
        } else {
            user = userAllEntries[0];
        }

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        if (user.verificationCode !== Number(otp)) {
            return next(new ErrorHandler("Invalid OTP", 400));
        }

        const currentTime = Date.now();
        const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();
        console.log(currentTime);
        console.log(verificationCodeExpire);
        if (currentTime > verificationCodeExpire) {
            return next(new ErrorHandler("OTP has expired", 400));
        }

        user.accountVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpire = null;
        await user.save({ validateBeforeSave: false });
        console.log("User account verified:", user);


        sendToken(user, 200, "Account verified successfully", res);

    } catch (error) {
        console.error("Error during OTP verification:", error);
        return next(new ErrorHandler("Failed to verify OTP", 500));
    }
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    // Find user by email
    const checkUser = await User.findOne({ email }).select("+password");

    if (!checkUser) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (!checkUser.accountVerified) {
        return next(new ErrorHandler("Please verify your account via OTP before logging in.", 403));
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendToken(user, 200, "Login successful", res);
    console.log("User logged in:", user);
});

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully",
    });
    console.log("✅User logged out successfully");
});
console.log(logout);

export const getUser = catchAsyncError(async (req, res, next) => {
    const user = req.user; // Assuming user is set in the request by isAuthenticated middleware
    res.status(200).json({
        success: true,
        user,
    });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email,
        accountVerified: true,
    });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = await user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordurl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is: ${resetToken}. It is valid for 30 minutes. Click the link to reset your password: ${resetPasswordurl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: "MERN AUTHENTICATION - Password Reset",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} with password reset instructions`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
            new ErrorHandler("Failed to send reset password email", 500)
        );
    }
});


export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }, // Check if token is still valid
    });
    if (!user) {
        return next(
            new ErrorHandler(
                "Invalid or expired reset password token",
                400
            ));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(
            new ErrorHandler(
                "Passwords do not match",
                400
            ));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, "Password reset successful", res);
});