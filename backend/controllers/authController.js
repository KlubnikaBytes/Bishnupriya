const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

exports.sendOtp = async (req, res) => {
  // 1. Destructure all fields
  const { mobile, isLogin, fullName, email, companyName, gst } = req.body;

  try {
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; 

    let user = await User.findOne({ mobile });

    if (isLogin) {
      if (!user) {
        return res.status(404).json({ message: "User not found. Please register first." });
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      if (user) {
        return res.status(400).json({ message: "User already exists. Please login." });
      }
      
      // 2. CREATE NEW USER
      // IMPORTANT: Use email: undefined if the string is empty
      // This allows the sparse index to work correctly.
      user = new User({
        mobile, 
        fullName, 
        email: email && email.trim() !== "" ? email : undefined, 
        companyName, 
        gst, 
        otp, 
        otpExpires
      });
    }

    await user.save();

    res.status(200).json({ 
      success: true, 
      message: `OTP sent to ${mobile}`, 
      otp: otp 
    });

  } catch (error) {
    // Better error logging
    console.error("Auth Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};