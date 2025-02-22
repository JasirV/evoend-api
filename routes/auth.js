const express = require('express');
const { otpVerification, register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/otpverification',otpVerification)
router.post('/login', login);

module.exports = router;
