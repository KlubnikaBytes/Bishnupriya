const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [
    {
      productId: { type: String, required: true }, // Using String if your itemsData IDs are strings
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      brand: { type: String },
      category: { type: String },
      qty: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);