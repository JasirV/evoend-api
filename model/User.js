// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  language: {
    type: String,
  },
  education: String,
  occupation: String,
  profileImage: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  preferences: {
    ageRange: {
      min: Number,
      max: Number,
    },
    caste: String,
    region: String,
    education: String,
    occupation: String,
  },
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, 
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
