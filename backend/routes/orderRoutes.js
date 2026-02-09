const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Secure all order routes
router.use(protect);

/**
 * FIXED: Registered the create path to stop the 404 error
 */
router.post('/create', createOrder);

/**
 * Used for your "My Activity" / "My Orders" page
 */
router.get('/my-orders', getMyOrders);

module.exports = router;