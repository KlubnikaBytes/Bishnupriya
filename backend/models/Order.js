const mongoose = require('mongoose');

/**
 * Order Schema
 * Captures a complete snapshot of the purchase to ensure history remains 
 * accurate even if products are modified or deleted in the future.
 */
const orderSchema = new mongoose.Schema({
  // Reference to the authenticated user
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Snapshots of the products purchased
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String } // Crucial for displaying the preview in MyOrders
    }
  ],

  // Delivery details captured from the checkout form
  shippingDetails: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },

  // Payment and Logistics tracking
  totalPrice: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['Razorpay', 'COD'] 
  },
  paymentId: { 
    type: String, 
    default: 'PENDING' // Stores rzp_payment_id or 'COD_ORDER'
  },

  // Order status management
  status: { 
    type: String, 
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
  }
}, { 
  timestamps: true // Automatically generates createdAt and updatedAt
});

module.exports = mongoose.model('Order', orderSchema);