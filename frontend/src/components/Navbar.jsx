import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShoppingCart, Search, Menu, X, Phone, User, LogOut, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Auth State
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation(); 

  // --- HELPER: Read User Data Safely ---
  const getUserFromStorage = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  // --- 1. AUTH CHECK & EVENT LISTENER ---
  useEffect(() => {
    // Initial check on mount
    setUser(getUserFromStorage());

    // LISTEN for the 'auth-change' event (Triggered by Login/Logout)
    const handleAuthChange = () => {
      setUser(getUserFromStorage());
    };

    window.addEventListener('auth-change', handleAuthChange);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []); 

  // Re-check on route change (Backup safety)
  useEffect(() => {
     setUser(getUserFromStorage());
  }, [location]);


  // --- 2. LOGOUT LOGIC ---
  const handleLogout = () => {
    // A. Clear Storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // B. Trigger Event to update Navbar INSTANTLY
    window.dispatchEvent(new Event("auth-change"));
    
    // C. Reset Local State
    setIsProfileOpen(false);
    setIsOpen(false); 

    // D. Stay on Home Page
    navigate('/');
  };

  // Theme Logic
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      
      {/* Top Mini Bar */}
      <div className="bg-slate-900 dark:bg-black text-white text-[10px] py-1 px-6 flex justify-between items-center uppercase tracking-widest">
        <span>Free Delivery on orders above ₹5000</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Phone size={10} /> Support: +91 98765 43210</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-500/20 transition-transform group-hover:scale-105">
              BE
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold leading-none dark:text-white uppercase tracking-tighter">
                Bishnupriya
              </h1>
              <p className="text-[10px] text-green-500 font-bold tracking-[0.2em] uppercase text-nowrap">Electrical</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 font-semibold text-sm text-slate-600 dark:text-gray-300">
            <button onClick={() => navigate('/')} className="hover:text-green-500 transition">Home</button>
            <button className="hover:text-green-500 transition">Store</button>
            <button className="hover:text-green-500 transition">Categories</button>
            <button className="hover:text-green-500 transition">Bulk Inquiry</button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Desktop Search */}
            <div className="hidden md:block relative group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 text-sm rounded-full py-2 pl-4 pr-10 w-48 focus:w-64 transition-all duration-300 outline-none focus:ring-2 focus:ring-green-500 border border-transparent dark:border-slate-700"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" />
            </div>

            {/* Mobile Search Icon */}
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)} 
              className="md:hidden text-slate-600 dark:text-gray-300 hover:text-green-500 transition"
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Theme Toggle */}
            <div 
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer transition-colors duration-500 flex-shrink-0"
            >
              <motion.div 
                animate={{ x: darkMode ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-white dark:bg-blue-400 rounded-full flex items-center justify-center shadow-md"
              >
                {darkMode ? <Moon size={10} className="text-white" /> : <Sun size={10} className="text-orange-500" />}
              </motion.div>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
            
            {/* ======================================================= */}
            {/* PROFESSIONAL AUTH LOGIC (Updated)                       */}
            {/* ======================================================= */}
            
            {user ? (
              // >>> CASE 1: LOGGED IN (Show Profile Icon) <<<
              <div 
                className="relative z-50"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 transition hover:shadow-md"
                >
                  {user.fullName ? (
                    <span className="font-bold text-xs">{user.fullName.charAt(0).toUpperCase()}</span>
                  ) : (
                    <User size={18} />
                  )}
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden"
                    >
                      <div className="p-4 border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                          {user.fullName || 'Valued Customer'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.mobile}
                        </p>
                      </div>

                      <div className="py-2">
                        <button 
                          onClick={() => { navigate('/my-orders'); setIsProfileOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                        >
                          <Package size={16} /> View Orders
                        </button>
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // >>> CASE 2: LOGGED OUT (Show Login Button) <<<
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-green-500 hover:bg-green-600 transition shadow-lg shadow-green-500/20"
              >
                <User size={16} /> Login
              </button>
            )}

            {/* Cart */}
            <div className="relative group cursor-pointer">
              <ShoppingCart size={20} className="text-slate-600 dark:text-gray-300 group-hover:text-green-500 transition" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-600 dark:text-gray-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Nav (Omitted for brevity, keep your existing code here) */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for electrical items..." 
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl py-3 pl-10 pr-4 outline-none border border-transparent focus:border-green-500 transition-all"
                  autoFocus
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

       {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-gray-50 dark:bg-slate-800 px-6 border-t dark:border-slate-700"
          >
            <div className="flex flex-col gap-4 py-6 font-medium dark:text-white">
              <button className="text-left py-2 border-b dark:border-slate-700" onClick={() => { navigate('/'); setIsOpen(false); }}>Home</button>
              <button className="text-left py-2 border-b dark:border-slate-700" onClick={() => setIsOpen(false)}>Store</button>
              <button className="text-left py-2 border-b dark:border-slate-700" onClick={() => setIsOpen(false)}>Categories</button>
              <button className="text-left py-2 border-b dark:border-slate-700" onClick={() => setIsOpen(false)}>Bulk Inquiry</button>
              
              {user ? (
                <>
                  <div className="py-2 border-b dark:border-slate-700">
                     <p className="text-xs text-slate-500">Signed in as</p>
                     <p className="font-bold text-green-600">{user.fullName || user.mobile}</p>
                  </div>
                  <button 
                    className="text-left flex items-center gap-2 py-2 border-b dark:border-slate-700 hover:text-green-500" 
                    onClick={() => { navigate('/my-orders'); setIsOpen(false); }}
                  >
                    <Package size={16} /> View Orders
                  </button>
                  <button 
                    className="text-left flex items-center gap-2 text-red-500 py-2 hover:text-red-600" 
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <button 
                  className="text-left flex items-center gap-2 text-green-500 font-bold py-2" 
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                >
                  <User size={16} /> Login / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;