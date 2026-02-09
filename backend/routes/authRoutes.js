const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// --- 1. CUSTOMER AUTH (OTP Based) ---
// Starts the OTP flow for login or registration
router.post('/send-otp', sendOtp);

// Validates the code and issues a JWT token
router.post('/verify-otp', verifyOtp);

// --- 2. AUTH SYNC (The "Who Am I" Route) ---
// This handles GET http://localhost:5000/api/auth/me
// It is called by React on refresh to sync Navbar with the DB using only the token
router.get('/me', protect, getUserProfile);

// --- 3. ADMIN AUTH (Credentials Based) ---
// Handles the specific id123 / 1234 logic for Admin Panel access
router.post('/admin-login', (req, res) => {
    const { adminId, password } = req.body;

    if (adminId === 'id123' && password === '1234') {
        return res.status(200).json({
            success: true,
            message: "Admin Access Granted",
            role: 'admin'
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid Admin ID or Password"
        });
    }
});

module.exports = router;