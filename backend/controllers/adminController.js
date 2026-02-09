const Order = require('../models/Order');
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');

// ... (keep your existing inventory and inquiry functions)

/**
 * @desc    Get ALL retail orders for Admin Dashboard
 * @route   GET /api/admin/orders
 * @access  Private/Admin
 */
exports.getAllOrders = async (req, res) => {
  try {
    // We fetch every order in the DB and sort by newest first
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    // Always return an array to prevent frontend .map() crashes
    res.status(200).json(orders || []);
  } catch (error) {
    console.error("Admin Order Fetch Error:", error);
    res.status(500).json({ message: "Internal Server Error fetching orders" });
  }
};

/**
 * @desc    Update Order Status
 * @route   PUT /api/admin/orders/:id/status
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};