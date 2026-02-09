const express = require('express');
const router = express.Router();
const { submitInquiry, getMyInquiries } = require('../controllers/inquiryController');

/**
 * @route   POST /api/inquiry/submit
 * @desc    Public route to submit a new corporate B2B inquiry
 * @access  Public
 */
router.post('/submit', submitInquiry);

/**
 * @route   GET /api/inquiry/my-inquiries
 * @desc    Retrieve all B2B inquiries associated with a specific user email
 * @access  Public (Filtered by email query parameter)
 */
router.get('/my-inquiries', getMyInquiries);

module.exports = router;