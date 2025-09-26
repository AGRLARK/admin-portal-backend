
const ApiError = require("./ApiError");

exports.AsyncHandler =
    (fn) => async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            console.log(error);
            const statusCode = error.code || error.statusCode || 500;
            return res
                .status(statusCode)
                .json(new ApiError(statusCode, error?.message, error?.errors))
        }
    }