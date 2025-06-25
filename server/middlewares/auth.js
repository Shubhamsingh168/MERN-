import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js"; // Import User model if needed

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies; //using {token} to destructure the token from cookies
    if(!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);
    next();
});