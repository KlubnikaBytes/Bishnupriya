import React, { useState } from 'react';
import { 
  Trash2, Plus, Minus, ArrowLeft, ShoppingBag, 
  ArrowRight, MapPin, CreditCard, CheckCircle, 
  Loader2, Wallet, ShoppingCart 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, user, setCart } = useCart();
  
  // --- ENVIRONMENT VARIABLES ---
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // --- CHECKOUT NAVIGATION STATE ---
  const [checkoutStep, setCheckoutStep] = useState('cart'); // steps: 'cart', 'details', 'payment'
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.fullName || '',
    phone: user?.mobile || '',
    address: '',
    city: '',
    pincode: ''
  });

  // --- CALCULATIONS ---
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = subtotal * 0.18; // 18% GST

  /** * LOGISTICS CALCULATION
   * If Subtotal >= 5000, Shipping is FREE (0).
   * Otherwise, Shipping is ₹500.
   */
  const shippingThreshold = 5000;
  const shippingCharge = 500;
  const shipping = (subtotal >= shippingThreshold || subtotal === 0) ? 0 : shippingCharge; 
  
  const total = subtotal + gst + shipping;

  // --- RAZORPAY SDK LOADER ---
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- ORDER FINALIZATION ---
  const handleOrderSuccess = async (paymentId, method) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: cart,
          shippingDetails,
          totalPrice: total,
          paymentMethod: method,
          paymentId: paymentId || 'COD_ORDER'
        })
      });

      if (response.ok) {
        setCart([]); // Clear local cart state
        navigate('/my-orders');
      } else {
        const error = await response.json();
        alert(error.message || "Order placement failed.");
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("Order placement failed. Please contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay SDK failed to load.");

    const options = {
      key: RAZORPAY_KEY_ID, 
      amount: Math.round(total * 100), // In paise
      currency: "INR",
      name: "Bishnupriya Electricals",
      description: "Secure Purchase",
      handler: (res) => handleOrderSuccess(res.razorpay_payment_id, 'Razorpay'),
      prefill: { 
        name: shippingDetails.fullName, 
        contact: shippingDetails.phone 
      },
      theme: { color: "#059669" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // --- EMPTY CART VIEW ---
  const EmptyCartView = () => (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-slate-300 dark:text-slate-700" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Your Cart is <span className="text-emerald-600">Empty</span></h2>
        <p className="text-slate-500 mb-10">Add premium components to proceed with your order.</p>
        <button onClick={() => navigate('/store')} className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-5 rounded-2xl shadow-xl hover:scale-105 transition-all">BACK TO CATALOGUE</button>
      </motion.div>
    </div>
  );

  if (cart.length === 0 && checkoutStep === 'cart') return <EmptyCartView />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-12 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">
            {checkoutStep === 'cart' ? 'Shopping ' : 'Secure '}
            <span className="text-emerald-600">{checkoutStep === 'cart' ? 'Bag' : 'Checkout'}</span>
          </h1>
          {checkoutStep !== 'cart' && (
            <button 
              onClick={() => setCheckoutStep(checkoutStep === 'payment' ? 'details' : 'cart')}
              className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-emerald-600 uppercase transition-all"
            >
              <ArrowLeft size={16} /> Back to {checkoutStep === 'payment' ? 'Shipping' : 'Cart'}
            </button>
          )}
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT SECTION: DYNAMIC CONTENT --- */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {checkoutStep === 'cart' && (
                <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.productId || item.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-lg transition-all">
                      <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden flex-shrink-0 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700">
                        <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{item.brand}</span>
                        <h3 className="font-bold text-slate-900 dark:text-white text-xl">{item.name}</h3>
                        <p className="font-black text-slate-950 dark:text-white text-2xl mt-4">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center gap-4">
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700">
                          <button onClick={() => updateQuantity(item.productId || item.id, -1)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl disabled:opacity-30 shadow-sm" disabled={item.qty <= 1}><Minus size={18} /></button>
                          <span className="w-12 text-center font-black dark:text-white">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.productId || item.id, 1)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm"><Plus size={18} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.productId || item.id)} className="p-4 text-slate-300 hover:text-red-500 transition-all"><Trash2 size={24} /></button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {checkoutStep === 'details' && (
                <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Receiver Name</label>
                      <input required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 ring-emerald-500 font-bold dark:text-white" value={shippingDetails.fullName} onChange={e => setShippingDetails({...shippingDetails, fullName: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mobile Number</label>
                      <input required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 ring-emerald-500 font-bold dark:text-white" value={shippingDetails.phone} onChange={e => setShippingDetails({...shippingDetails, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Delivery Address</label>
                    <textarea rows="3" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 ring-emerald-500 font-bold resize-none dark:text-white" value={shippingDetails.address} onChange={e => setShippingDetails({...shippingDetails, address: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <input placeholder="City" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold outline-none dark:text-white" value={shippingDetails.city} onChange={e => setShippingDetails({...shippingDetails, city: e.target.value})} />
                    <input placeholder="Pincode" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold outline-none dark:text-white" value={shippingDetails.pincode} onChange={e => setShippingDetails({...shippingDetails, pincode: e.target.value})} />
                  </div>
                  <button onClick={() => setCheckoutStep('payment')} disabled={!shippingDetails.address || !shippingDetails.phone} className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-6 rounded-2xl shadow-xl active:scale-95 disabled:opacity-50 uppercase tracking-widest">CONTINUE TO PAYMENT</button>
                </motion.div>
              )}

              {checkoutStep === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <button 
                    onClick={handleRazorpay} 
                    disabled={isProcessing}
                    className="w-full flex items-center justify-between p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-emerald-500 transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl">
                        {isProcessing ? <Loader2 className="animate-spin" size={32} /> : <CreditCard size={32} />}
                      </div>
                      <div className="text-left">
                        <p className="font-black dark:text-white uppercase tracking-tighter text-xl">Online Payment</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">UPI, Cards, NetBanking via Razorpay</p>
                      </div>
                    </div>
                    <ArrowRight size={24} className="text-slate-300 group-hover:text-emerald-500 transition-all" />
                  </button>

                  <button 
                    onClick={() => handleOrderSuccess(null, 'COD')} 
                    disabled={isProcessing}
                    className="w-full flex items-center justify-between p-8 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-blue-500 transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-blue-100 dark:bg-blue-950/40 text-blue-600 rounded-2xl">
                        {isProcessing ? <Loader2 className="animate-spin" size={32} /> : <Wallet size={32} />}
                      </div>
                      <div className="text-left">
                        <p className="font-black dark:text-white uppercase tracking-tighter text-xl">Cash on Delivery</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pay in cash upon component delivery</p>
                      </div>
                    </div>
                    <ArrowRight size={24} className="text-slate-300 group-hover:text-blue-500 transition-all" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT SECTION: STICKY SUMMARY --- */}
          <aside className="lg:w-1/3">
            <div className="bg-slate-900 dark:bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl sticky top-24 border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><ShoppingCart size={120} /></div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-white/10 italic">Order <span className="text-emerald-500 not-italic">Summary</span></h3>
              <div className="space-y-5 mb-10 text-xs font-bold uppercase tracking-widest text-slate-400">
                <div className="flex justify-between"><span>Subtotal</span><span className="text-white font-black">₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Tax (GST 18%)</span><span className="text-white font-black">₹{gst.toLocaleString()}</span></div>
                <div className="flex justify-between items-center">
                  <span>Logistics</span>
                  <span className={shipping === 0 ? 'text-emerald-500 font-black flex items-center gap-1' : 'text-white font-black'}>
                    {shipping === 0 && <CheckCircle size={12} />}
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
              </div>

              {/* FREE SHIPPING PROGRESS BAR */}
              {subtotal < shippingThreshold && subtotal > 0 && (
                <div className="mb-10 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <p className="text-[10px] font-black text-emerald-400 uppercase text-center tracking-widest">
                    Add ₹{(shippingThreshold - subtotal).toLocaleString()} for Free Delivery
                  </p>
                  <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(subtotal / shippingThreshold) * 100}%` }}
                      className="bg-emerald-500 h-full"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-end mb-10 pt-6 border-t border-white/10">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Payable</p>
                  <p className="text-5xl font-black text-white tracking-tighter italic leading-none">₹{total.toLocaleString()}</p>
                </div>
              </div>
              
              {checkoutStep === 'cart' && (
                <button onClick={() => setCheckoutStep('details')} className="group w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-emerald-500/10">
                  PROCEED TO CHECKOUT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <p className="mt-8 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Secure Bishnupriya Checkout</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;