import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ArrowRight, User, CheckCircle, ChevronLeft, Building2, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  // Form States
  const [identifier, setIdentifier] = useState(''); // Used for Login (Email/Mobile)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    companyName: '',
    gst: ''
  });

  const [otp, setOtp] = useState('');

  // Timer Logic
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle Input for Signup
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // --- 1. SEND OTP ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload based on Login or Signup
    const payload = isLogin 
      ? { mobile: identifier, isLogin: true } 
      : { ...formData, isLogin: false };

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // FOR DEV: Log OTP to console
        console.log("DEV MODE OTP:", data.otp);
        alert(`OTP Sent! (Check Console): ${data.otp}`); 
        
        setStep(2);
        setTimer(30);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. VERIFY OTP (Updated for Navbar Sync) ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    setLoading(true);

    // Determine which mobile number to verify against
    const mobileToVerify = isLogin ? identifier : formData.mobile;

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: mobileToVerify, otp }),
      });

      const data = await response.json();

      if (data.success) {
        // A. Save Token
        localStorage.setItem('token', data.token);
        
        // B. Save User Data with the correct key 'user' (was 'userInfo')
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // C. CRITICAL: Tell Navbar to update instantly
        window.dispatchEvent(new Event("auth-change"));

        // D. Navigate Home
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300 px-4 relative overflow-hidden font-sans">
      
      {/* Background Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 relative z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-10 pb-4 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto flex items-center justify-center text-white font-black text-2xl shadow-lg mb-6 shadow-green-500/20">
            BE
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            {step === 2 ? "Verification Code" : (isLogin ? "Welcome Back" : "Join Bishnupriya")}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {step === 2 
              ? `Code sent to ${isLogin ? identifier : formData.mobile}` 
              : (isLogin ? "Login to manage your business orders" : "Create a verified business account")
            }
          </p>
        </div>

        {/* Form Area */}
        <div className="px-8 pb-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: LOGIN / SIGNUP */}
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* LOGIN FORM */}
                {isLogin ? (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <span className="absolute left-11 top-3.5 text-slate-500 font-medium text-sm border-r border-slate-300 pr-2 mr-2">+91</span>
                      <input 
                        type="text" 
                        placeholder="9876543210"
                        value={identifier}
                        inputMode="numeric"
                        maxLength={10}
                        onChange={(e) => setIdentifier(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-24 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  /* SIGNUP FORM */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="relative group">
                        <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input 
                          name="fullName"
                          type="text" 
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium text-sm"
                          required
                        />
                      </div>

                      {/* Company */}
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input 
                          name="companyName"
                          type="text" 
                          placeholder="Company Name"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium text-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <input 
                        name="email"
                        type="email" 
                        placeholder="Business Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium text-sm"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="relative group">
                      <Phone className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <span className="absolute left-11 top-3.5 text-slate-500 font-medium text-sm border-r border-slate-300 pr-2 mr-2">+91</span>
                      <input 
                        name="mobile"
                        type="text" 
                        inputMode="numeric"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-24 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium text-sm"
                        required
                        maxLength={10}
                      />
                    </div>

                    {/* GST */}
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-3.5 text-slate-400" size={18} />
                      <input 
                        name="gst"
                        type="text" 
                        placeholder="GST Number (Optional)"
                        value={formData.gst}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-medium text-sm uppercase"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button 
                  disabled={loading}
                  className="w-full bg-slate-900 dark:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Get OTP" : "Create Account"} 
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 2 && (
              <motion.form
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6"
              >
                <div className="flex justify-center my-8">
                  <input 
                    type="text" 
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="• • • •"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full text-center text-4xl font-black tracking-[1em] bg-transparent border-b-2 border-slate-200 dark:border-slate-600 focus:border-green-500 outline-none pb-2 dark:text-white transition-colors"
                    autoFocus
                  />
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <span className={`${timer > 0 ? 'text-slate-400' : 'text-blue-500 cursor-pointer font-bold hover:underline'}`}>
                    {timer > 0 ? `Resend in 00:${timer.toString().padStart(2, '0')}` : "Resend OTP"}
                  </span>
                </div>

                <button 
                  disabled={loading || otp.length !== 4}
                  className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Verify & Proceed <CheckCircle size={20} /></>
                  )}
                </button>
              </motion.form>
            )}

          </AnimatePresence>

          {/* Footer */}
          {step === 1 && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700/50 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {isLogin ? "New to Bishnupriya?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 font-bold text-green-600 dark:text-green-400 hover:underline"
                >
                  {isLogin ? "Register Business" : "Login Here"}
                </button>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;