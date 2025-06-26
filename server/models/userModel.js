import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { name } from 'ejs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        minlength: [8, 'Password should be greater than 8 characters'],
        maxlength: [32, 'Password should be less than 32 characters'],
        select: false, // Do not return password in queries
    },
    phone: String,
    accountVerified: { type: Boolean, default: false },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,

    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
    function generateRandomCode() {
        const firstDigit = Math.floor(Math.random() * 9) + 1; // First digit cannot be 0
        const remainingDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Ensure 4 digits
        return parseInt(firstDigit.toString() + remainingDigits, 10);
    }
    const verificationCode = generateRandomCode();
    this.verificationCode = verificationCode;
    this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // Code valid for 10 minutes
    return verificationCode;
};

userSchema.methods.generateToken = async function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE
        }
    );
};

userSchema.methods.generateResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes
return resetToken;
}



export const User = mongoose.model('User', userSchema);