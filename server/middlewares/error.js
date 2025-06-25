class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name === "CastError") {
        const message = `Invalid ${err.path} `;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "JsonwebTokenError") {
        const message = `json web token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "tokenExpiredError") {
        const message = `json web token is expire, try again`;
        err = new ErrorHandler(message, 400);
    }

    if(err.code=== 11000){
        const message = `duplicate ${Object.keys(err.keyvalues)}entered`;
        err = new ErrorHandler(message, 400);
    }
    return res.status (err.statusCode).json({
        success: false,
        message: err.message,
        error:err.stack
    })
};

export default ErrorHandler;
  