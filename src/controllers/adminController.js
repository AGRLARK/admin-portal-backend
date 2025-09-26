const Admin = require('../models/adminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AsyncHandler } = require('../utils/AsyncHandler');
const ApiResponse  = require('../utils/ApiResponse');
const  ApiError  = require('../utils/ApiError');

// Register new admin
exports.registerAdmin = AsyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ApiError(400, 'Please provide name, email, and password'));
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return next(new ApiError(409, 'Email already registered'));

    const admin = await Admin.create({ name, email, password });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.status(201).json(new ApiResponse(201, { admin, token }, 'Admin registered successfully'));
});

// Login admin
exports.loginAdmin = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ApiError(400, 'Please provide email and password'));

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) return next(new ApiError(401, 'Invalid credentials'));

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return next(new ApiError(401, 'Invalid credentials'));

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.status(200).json(new ApiResponse(200, { admin, token }, 'Login successful'));
});

// Get current admin profile
exports.getProfile = AsyncHandler(async (req, res, next) => {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.status(200).json(new ApiResponse(200, { admin }, 'Profile retrieved'));
});
