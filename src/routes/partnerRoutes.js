const express = require('express');
const { createPartner, searchPartners, getPartnerById } = require('../controllers/partnerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Only authenticated admins
router.post('/', protect, createPartner);
router.get('/search', protect, searchPartners);
router.get('/:id', protect, getPartnerById);

module.exports = router;
