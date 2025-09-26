const express = require('express');
const { registerAdmin, loginAdmin, getProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', protect, getProfile);

module.exports = router;
