const Partner = require('../models/partnerSchema');
const { AsyncHandler } = require('../utils/AsyncHandler');
const  ApiResponse  = require('../utils/ApiResponse');
const ApiError  = require('../utils/ApiError');

// Create partner (optional)
exports.createPartner = AsyncHandler(async (req, res, next) => {
    const partner = await Partner.create({ ...req.body, createdBy: req.admin.id });
    res.status(201).json(new ApiResponse(201, { partner }, 'Partner created successfully'));
});

// Search partners by keywords
exports.searchPartners = AsyncHandler(async (req, res, next) => {
    const { keywords, page = 1, limit = 10 } = req.query;

    if (!keywords) return next(new ApiError(400, 'Please provide keywords'));

    const keywordArray = keywords
        .split(/[\s,]+/)
        .map(k => k.toLowerCase().trim())
        .filter(Boolean);

    const query = {
        isActive: true,
        $or: [
            { keywords: { $in: keywordArray } },
            { description: { $regex: keywordArray.join('|'), $options: 'i' } }
        ]
    };

    const partners = await Partner.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Partner.countDocuments(query);

    res.status(200).json(
        new ApiResponse(200, { partners, pagination: { page: Number(page), limit: Number(limit), total } }, 'Partners retrieved')
    );
});

// Optional: get single partner
exports.getPartnerById = AsyncHandler(async (req, res, next) => {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return next(new ApiError(404, 'Partner not found'));
    res.status(200).json(new ApiResponse(200, { partner }, 'Partner retrieved'));
});
