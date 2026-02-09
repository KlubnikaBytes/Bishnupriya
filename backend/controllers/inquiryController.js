const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

/**
 * @desc    Submit a new B2B Inquiry and notify company via email
 * @route   POST /api/inquiry/submit
 */
exports.submitInquiry = async (req, res) => {
  try {
    const { fullName, companyName, email, mobile, category, message } = req.body;

    // 1. Save to Database
    // We normalize the email to lowercase upon creation to ensure a consistent standard
    const newInquiry = await Inquiry.create({
      fullName, 
      companyName, 
      email: email.toLowerCase().trim(), 
      mobile, 
      category, 
      message
    });

    // 2. Send Email Notification to Company (klubnikabytes@gmail.com)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BP B2B Portal" <${process.env.EMAIL_USER}>`,
      to: "klubnikabytes@gmail.com",
      subject: `New Bulk Inquiry from ${companyName || fullName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h3 style="color: #059669; text-transform: uppercase; letter-spacing: 1px;">New Corporate Enquiry Received</h3>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Lead Name:</strong> ${fullName}</p>
          <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${mobile}</p>
          <p><strong>Category:</strong> <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px;">${category}</span></p>
          <p><strong>Requirements:</strong></p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #059669; font-style: italic;">
            "${message}"
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 11px; color: #9ca3af; text-align: center;">Bishnupriya Electricals Distribution Hub &copy; 2026</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Inquiry sent successfully" });
  } catch (error) {
    console.error("Inquiry Submission Error:", error);
    res.status(500).json({ success: false, message: "Failed to process inquiry" });
  }
};

/**
 * @desc    Admin: Retrieve all corporate inquiries
 * @route   GET /api/admin/inquiries
 */
exports.getInquiries = async (req, res) => {
  try {
    // Fetches all inquiries for the Admin Leads tab
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }) || [];
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    // Return empty array to prevent frontend .map() crash
    res.status(500).json([]); 
  }
};

/**
 * @desc    Customer: Retrieve their personal inquiries by email (Case-Insensitive)
 * @route   GET /api/inquiry/my-inquiries
 */
exports.getMyInquiries = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Identity email is required" });
    }

    // ROBUST SEARCH: Use Case-Insensitive regex to ensure matching even with mixed casing
    const userInquiries = await Inquiry.find({ 
      email: { $regex: new RegExp("^" + email.toLowerCase().trim() + "$", "i") } 
    }).sort({ createdAt: -1 }) || [];
    
    res.status(200).json(userInquiries);
  } catch (error) {
    console.error("User Tracking Error:", error);
    // Always return array fallback to keep frontend stable
    res.status(500).json([]);
  }
};