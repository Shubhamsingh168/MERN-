export const sendToken = async (user, statusCode, message, res) => {
    const token = await user.generateToken();
    console.log(token);
    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // only true in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",  // "None" for cross-site cookie
    }).json({
        success: true,
        message,
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            accountVerified: user.accountVerified,
        },
    });
    console.log("✅ Token sent successfully");
}