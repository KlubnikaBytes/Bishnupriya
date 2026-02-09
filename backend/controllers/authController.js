const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Helper: Generates a secure 4-digit OTP string
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

/**
 * SEND OTP: Updated to find users by EMAIL
 * React frontend must send: { email, isLogin, [fullName, companyName, gst] }
 */
exports.sendOtp = async (req, res) => {
  const { email, isLogin, fullName, companyName, gst, mobile } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minute Validity

    // DATABASE LOOKUP: Use lowercase email to prevent duplication
    let user = await User.findOne({ email: email.toLowerCase() });

    if (isLogin) {
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "Account not found. Please register your email first." 
        });
      }
      user.otp = otp;
      user.otpExpires = otpExpires;
    } else {
      if (user) {
        return res.status(400).json({ 
          success: false, 
          message: "This email is already registered. Please login." 
        });
      }
      
      // Initialize new BP Partner using email as primary key
      user = new User({
        email: email.toLowerCase(),
        mobile: mobile || undefined, // IMPORTANT: mobile must be optional in your User Schema
        fullName,
        companyName,
        gst,
        otp,
        otpExpires
      });
    }

    await user.save();

    // EMAIL DISPATCH
    try {
      await sendEmail({
        email: user.email,
        subject: 'BP Partner Access Code',
        otp: otp
      });
    } catch (err) {
      console.error("Nodemailer Dispatch Failed:", err.message);
      // We don't return 500 here so developer testing can continue via console log
    }

    // Always return OTP in response for development console testing
    res.status(200).json({ 
      success: true, 
      message: `OTP dispatched to ${user.email}`, 
      otp: otp 
    });

  } catch (error) {
    console.error("CRITICAL AUTH ERROR (sendOtp):", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

/**
 * VERIFY OTP: Updated to verify by EMAIL
 * React frontend must send: { email, otp }
 */
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ success: false, message: "User record not found" });
    }

    // Check code match and time validity
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    // DB Hygiene: Clear sensitive fields immediately (One-time use enforcement)
    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    // Issue session token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error) {
    console.error("CRITICAL AUTH ERROR (verifyOtp):", error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};

/**
 * GET USER PROFILE: The live Database Sync engine
 * Identifies user via 'protect' middleware
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-otp -otpExpires');
    
    if (user) {
      res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        companyName: user.companyName,
        gst: user.gst,
        role: user.role || 'customer'
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("CRITICAL AUTH ERROR (getUserProfile):", error);
    res.status(500).json({ success: false, message: "Sync failed" });
  }
};