const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order'); // Required for Live Orders
const { getInquiries } = require('../controllers/inquiryController');

// ==========================================
// 1. INVENTORY MANAGEMENT ROUTES
// ==========================================

/**
 * @desc    Fetch every product (Deleted & Active)
 * @route   GET /api/admin/inventory
 */
router.get('/inventory', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @desc    Bulk Seed from local JSON data
 * @route   POST /api/admin/seed
 */
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({}); 

    const formattedData = req.body.map(item => ({
      name: item.name,
      brand: item.brand,
      category: item.category,
      price: item.price,
      stock: item.stock || 20,
      image: item.images ? item.images[0] : (item.image || ""), 
      description: item.details || item.description || "",
      isDeleted: false 
    }));

    const products = await Product.insertMany(formattedData);
    res.status(201).json({ success: true, count: products.length });
  } catch (err) {
    res.status(400).json({ message: "Seed Error: " + err.message });
  }
});

/**
 * @desc    Manual Product Creation
 * @route   POST /api/admin/inventory
 */
router.post('/inventory', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image,
      description: req.body.description,
      isDeleted: false
    });
    
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @desc    Full Product Edit
 * @route   PUT /api/admin/inventory/:id
 */
router.put('/inventory/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Update failed: " + err.message });
  }
});

/**
 * @desc    Soft Delete (Recycle Bin)
 * @route   DELETE /api/admin/inventory/:id
 */
router.delete('/inventory/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Moved to Bin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @desc    Restore from Bin
 * @route   PUT /api/admin/inventory/restore/:id
 */
router.put('/inventory/restore/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: false }, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @desc    Permanent Removal
 * @route   DELETE /api/admin/inventory/permanent/:id
 */
router.delete('/inventory/permanent/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Permanently removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// 2. LIVE RETAIL ORDER ROUTES
// ==========================================

/**
 * @desc    Fetch ALL retail orders for Dashboard
 * @route   GET /api/admin/orders
 * FIXED: This ensures the "Live Orders" tab populates correctly
 */
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Orders fetch failed: " + err.message });
  }
});

/**
 * @desc    Update Order Lifecycle Status (Shipped, Delivered, etc.)
 * @route   PUT /api/admin/orders/:id/status
 */
router.put('/orders/:id/status', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order ID not found" });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: "Lifecycle update failed: " + err.message });
  }
});

// ==========================================
// 3. LEAD MANAGEMENT ROUTES
// ==========================================

router.get('/inquiries', getInquiries);

module.exports = router;