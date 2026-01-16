const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  
  // sparse: true is required here so multiple users can have empty emails
  email: { type: String, unique: true, sparse: true, trim: true, lowercase: true }, 
  
  mobile: { type: String, required: true, unique: true, trim: true },
  companyName: { type: String, trim: true },
  gst: { type: String, trim: true },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);