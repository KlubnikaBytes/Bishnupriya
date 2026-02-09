const Order = require('../models/Order');

/**
 * @desc    Create a new retail order (Online/COD)
 * @route   POST /api/orders/create
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    const { 
      items, 
      shippingDetails, 
      totalPrice, 
      paymentMethod, 
      paymentId 
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item." });
    }

    const newOrder = await Order.create({
      userId: req.user._id,
      items,
      shippingDetails,
      totalPrice,
      paymentMethod,
      paymentId,
      status: 'Processing', // Strict starting point
      createdAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("Critical Order Creation Error:", error);
    res.status(500).json({ success: false, message: "Failed to save order." });
  }
};

/**
 * @desc    Fetch order history for the logged-in user
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders || []);
  } catch (error) {
    console.error("Order Fetch Error:", error);
    res.status(500).json([]);
  }
};

/**
 * @desc    Get ALL orders for Admin Dashboard
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders || []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin orders" });
  }
};

/**
 * @desc    Update Order Status (Professional Linear Logic)
 * @route   PUT /api/admin/orders/:id/status
 * @access  Private/Admin
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status: newStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const currentStatus = order.status;

    // --- LINEAR STATE MACHINE LOGIC ---
    // Define exactly where an order is allowed to go from its current state
    const allowedTransitions = {
      'Processing': ['Shipped', 'Cancelled'],
      'Shipped': ['Delivered'],
      'Delivered': [], // Terminal State
      'Cancelled': []  // Terminal State
    };

    // Check if the requested jump is professional/valid
    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      return res.status(400).json({ 
        success: false, 
        message: `Illegal Move! Cannot change status from ${currentStatus} to ${newStatus}.` 
      });
    }

    // Apply the update
    order.status = newStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${newStatus}`,
      order
    });

  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ success: false, message: "Server error during status update" });
  }
};