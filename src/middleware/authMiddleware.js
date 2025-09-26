const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const ApiError  = require('../utils/ApiError');

// Protect middleware: checks if user is logged in
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ApiError(401, 'Not authorized, no token provided'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id).select('-password');

        if (!req.admin) {
            return next(new ApiError(401, 'Admin not found'));
        }

        next();
    } catch (error) {
        return next(new ApiError(401, 'Not authorized, token failed'));
    }
};

// Restrict middleware: restricts route access to certain roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return next(new ApiError(403, 'You do not have permission to perform this action'));
        }
        next();
    };
};
