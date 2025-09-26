const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Partner name is required'],
        trim: true,
        minlength: [2, 'Partner name must be at least 2 characters long'],
        maxlength: [100, 'Partner name cannot exceed 100 characters']
    },
    domain: {
        type: String,
        required: [true, 'Domain is required'],
        trim: true,
        maxlength: [50, 'Domain cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    keywords: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    website: {
        type: String,
        trim: true,
        match: [
            /^https?:\/\/.+/,
            'Please provide a valid website URL starting with http:// or https://'
        ]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please provide a valid email address'
        ]
    },
    phone: {
        type: String,
        trim: true,
        match: [
            /^[\+]?[1-9][\d]{0,15}$/,
            'Please provide a valid phone number'
        ]
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        zipCode: {
            type: String,
            trim: true
        }
    },
    services: [{
        type: String,
        trim: true
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    industryFocus: [{
        type: String,
        trim: true
    }],
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
        default: '1-10'
    },
    founded: {
        type: Number,
        min: [1800, 'Founded year cannot be before 1800'],
        max: [new Date().getFullYear(), 'Founded year cannot be in the future']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    logo: {
        type: String,
        trim: true
    },
    certifications: [{
        name: {
            type: String,
            trim: true
        },
        issuedBy: {
            type: String,
            trim: true
        },
        validUntil: Date
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Indexes for better search performance
partnerSchema.index({ 
    name: 'text', 
    description: 'text', 
    domain: 'text',
    'services': 'text',
    'technologies': 'text'
});
partnerSchema.index({ keywords: 1 });
partnerSchema.index({ domain: 1 });
partnerSchema.index({ isActive: 1 });
partnerSchema.index({ isVerified: 1 });
partnerSchema.index({ createdAt: -1 });
partnerSchema.index({ rating: -1 });
partnerSchema.index({ companySize: 1 });

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;