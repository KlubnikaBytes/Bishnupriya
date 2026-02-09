const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, // Required for professional business registration
    trim: true 
  },
  
  // EMAIL is now the primary unique identifier
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true 
  }, 
  
  // MOBILE is now optional to support email-first authentication
  // 'sparse: true' allows multiple users to have no mobile number without unique-key conflicts
  mobile: { 
    type: String, 
    unique: true, 
    sparse: true, 
    trim: true 
  },

  companyName: { 
    type: String, 
    trim: true 
  },

  gst: { 
    type: String, 
    trim: true,
    uppercase: true // Standardize GST format
  },

  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer' // Automatically categorizes new partners
  },

  otp: { 
    type: String 
  },

  otpExpires: { 
    type: Date 
  },

  isVerified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true }); // Automatically tracks account creation dates

module.exports = mongoose.model('User', userSchema);