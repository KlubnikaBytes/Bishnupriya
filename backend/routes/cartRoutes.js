const express = require('express');
const router = express.Router();
const { 
    getCart, 
    addToCart, 
    updateQuantity, // Added this import
    removeFromCart 
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/cart
 * @desc    Fetch the current user's cart from MongoDB
 * @access  Private
 */
router.get('/', protect, getCart);

/**
 * @route   POST /api/cart/add
 * @desc    Add a new component to the cart or increment existing
 * @access  Private
 */
router.post('/add', protect, addToCart);

/**
 * @route   PUT /api/cart/update
 * @desc    Directly update the quantity of a specific item (Fixes 404 Error)
 * @access  Private
 */
router.put('/update', protect, updateQuantity);

/**
 * @route   DELETE /api/cart/:id
 * @desc    Remove an item from the cart using its productId
 * @access  Private
 */
router.delete('/:id', protect, removeFromCart);

module.exports = router;