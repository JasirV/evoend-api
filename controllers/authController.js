const User = require('../model/User');
const OTP = require('../model/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/mailer');

// Generate OTP and send email
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await OTP.create({ phone: email, otp: otpCode });
    await sendOTPEmail(email, otpCode);
    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
};

// Verify OTP & Register
exports.register = async (req, res) => {
  const { name, gender, age, email, phone, password, religion, caste, region, otp } = req.body;
  try {
    const otpRecord = await OTP.findOne({ phone: email }).sort({ createdAt: -1 });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, gender, age, email, phone, password: hashedPassword,
      religion, caste, region, isVerified: true
    });

    await OTP.deleteMany({ phone: email }); // Clear OTP after use

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registration successful.', token, user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed.' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login successful.', token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
};
