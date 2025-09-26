const express = require('express');
const { createPartner, searchPartners, getPartnerById, getAllPartners, updatePartner, deletePartner } = require('../controllers/partnerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Only authenticated admins
router.post('/', protect, createPartner);
router.get('/search', protect, searchPartners);
router.get('/', protect, getAllPartners);
router.get('/:id', protect, getPartnerById);
router.put('/:id', protect, updatePartner);
router.delete('/:id', protect, deletePartner);

module.exports = router;
