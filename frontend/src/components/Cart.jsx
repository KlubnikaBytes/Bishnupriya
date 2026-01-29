import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  // Calculate Totals
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = subtotal * 0.18; // Assuming 18% GST standard for electrical
  const shipping = subtotal > 5000 ? 0 : 500; // Free shipping over 5000
  const total = subtotal + gst + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100 dark:border-slate-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Your Cart is Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Looks like you haven't added any electrical components yet.</p>
          <button 
            onClick={() => navigate('/store')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-8 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <ShoppingBag className="text-green-600" /> Shopping Cart <span className="text-lg font-medium text-slate-500">({cart.length} items)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- CART ITEMS LIST --- */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-6"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{item.brand} • {item.category}</p>
                  <p className="font-black text-green-600 dark:text-green-400 text-xl">₹{item.price.toLocaleString()}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors text-slate-600 dark:text-slate-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900 dark:text-white">{item.qty}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors text-slate-600 dark:text-slate-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- ORDER SUMMARY --- */}
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 border-b border-gray-100 dark:border-slate-700 pb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-slate-900 dark:text-white">Total Amount</span>
                <span className="text-2xl font-black text-green-600 dark:text-green-400">₹{total.toLocaleString()}</span>
              </div>

              <button className="w-full bg-slate-900 dark:bg-green-600 hover:bg-slate-800 dark:hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                Proceed to Checkout <ArrowRight size={20} />
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                Secure Checkout powered by Bishnupriya Electricals
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;