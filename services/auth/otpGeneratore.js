

 const otpGenerateore = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  return otp
};

module.exports =otpGenerateore