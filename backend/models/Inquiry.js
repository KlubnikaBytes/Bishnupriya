const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  companyName: { type: String },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  category: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Contacted', 'Resolved'] 
  }
}, { timestamps: true });

// CRITICAL: Ensure you are exporting the model correctly
module.exports = mongoose.model('Inquiry', inquirySchema);