class ApiError extends Error {
    constructor(statusCode = 500, message = 'Something went wrong', errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;
