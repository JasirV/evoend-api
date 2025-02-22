const User = require('../model/User');
const OTP = require('../model/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/mailer');
const otpGenerateore  = require('../services/auth/otpGeneratore');


// Verify OTP & Register
const register = async (req, res) => {
  const { name, gender, age, email, phone, password, religion, caste, region } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('jai')
    const otp= otpGenerateore()
    console.log(otp,'thjo')
    sendOTPEmail(email,otp)

    if(!otp){
      return res.status(404).json({error:"Some thing went to wrong"})
    }   
    const user = await User.create({
      name, gender, age, email, phone, password: hashedPassword,
      religion, caste, region, isVerified: false,otp
    });
    res.status(200).json({ message: `You Checkit Mail you can verify ${email}`});
  } catch (error) {
    res.status(500).json({ error: 'Registration failed.' });
  }
};


//Otp Verification


const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email & OTP required.' });
    const [user] = await User.aggregate([
      { $match: { email } },
      { $project: { otp: 1, isVerified: 1 } }
    ]);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    if (!user.otp) return res.status(400).json({ error: 'OTP expired. Request a new one.' });
    if (user.isVerified) return res.status(400).json({ error: 'User already verified.' });
    if (user.otp !== otp) return res.status(400).json({ error: 'Invalid OTP. Try again.' });
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true }, $unset: { otp: "" } },
      { new: true }
    );
    const token=jwt.sign({id: updatedUser._id},process.env.JWT_SECRET,{ expiresIn:'7d'});
    res.status(200).json({ message: 'Verification successful!',token });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ error: 'Verification failed. Please try later.' });
  }
};


// Login
const login = async (req, res) => {
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

module.exports={register,login,otpVerification}
