const express = require('express');
const { sendOTP, register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
