const Cart = require('../models/Cart');

/**
 * @desc    Get User Cart (or create empty if not exists)
 * @route   GET /api/cart
 */
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.status(500).json({ message: "Error fetching cart from database" });
  }
};

/**
 * @desc    Add Item to Cart or Increment Quantity
 * @route   POST /api/cart/add
 * FIXED: Prevents duplicate rows for identical products
 */
exports.addToCart = async (req, res) => {
  const { productId, name, price, image, brand, category, qty } = req.body;
  const quantityToAdd = Number(qty) || 1;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    // CRITICAL FIX: Convert both IDs to strings for a valid comparison
    // This ensures that "Torro LED Panel" updates its count instead of duplicating
    const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId.toString());

    if (itemIndex > -1) {
      // Item exists: Add to existing quantity
      cart.items[itemIndex].qty += quantityToAdd;
    } else {
      // Item doesn't exist: Create a new row
      cart.items.push({ 
        productId, 
        name, 
        price, 
        image: image || '', 
        brand: brand || 'Bishnupriya', 
        category, 
        qty: quantityToAdd 
      });
    }
    
    await cart.save();
    return res.status(200).json(cart);
    
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ message: "Error adding item to database" });
  }
};

/**
 * @desc    Update specific item quantity (Direct Set for Refresh Persistence)
 * @route   PUT /api/cart/update
 */
exports.updateQuantity = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // FIXED: Normalize ID to string to ensure the correct item is located
    const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId.toString());

    if (itemIndex > -1) {
      // Direct Set: Overwrite with exact number from frontend
      // Math.max(1, ...) prevents accidental zero or negative quantities
      cart.items[itemIndex].qty = Math.max(1, Number(qty));
      
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in your cart" });
    }
  } catch (error) {
    console.error("Update Quantity Error:", error);
    res.status(500).json({ message: "Error updating quantity" });
  }
};

/**
 * @desc    Remove Item from Cart
 * @route   DELETE /api/cart/:id
 */
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Normalize IDs to ensure filtering works correctly
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id.toString());
    
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Remove Item Error:", error);
    res.status(500).json({ message: "Error removing item from database" });
  }
};