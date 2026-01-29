import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShoppingCart, Search, Menu, X, Phone, User, LogOut, Package, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  // --- SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- AUTH CHECK & EVENT LISTENER ---
  useEffect(() => {
    setUser(getUserFromStorage());
    const handleAuthChange = () => {
      setUser(getUserFromStorage());
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []); 

  useEffect(() => {
     setUser(getUserFromStorage());
  }, [location]);


  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("auth-change"));
    setIsProfileOpen(false);
    setIsOpen(false); 
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
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm' 
          : 'bg-white dark:bg-slate-900 border-b border-transparent'
      }`}
    >
      
      {/* Top Mini Bar - Hidden on scroll to save space */}
      <motion.div 
        initial={{ height: 'auto', opacity: 1 }}
        animate={{ height: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
        className="bg-slate-900 dark:bg-black text-white text-[10px] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-between items-center uppercase tracking-widest font-medium">
          <span className="hidden sm:inline">Free Delivery on orders above ₹5000</span>
          <span className="sm:hidden">Free Delivery ₹5000</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-pointer">
              <Phone size={10} /> +91 98765 43210
            </span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-4">
          
          {/* Logo Section */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-green-500/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
              BE
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold leading-none text-slate-900 dark:text-white uppercase tracking-tighter group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Bishnupriya
              </h1>
              <p className="text-[10px] text-green-600 font-bold tracking-[0.2em] uppercase text-nowrap">Electricals</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600 dark:text-slate-300">
            {['Home', 'Store', 'Categories', 'Bulk Inquiry'].map((item) => (
              <button 
                key={item}
                onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`)}
                className="relative hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Desktop Search */}
            <div className="hidden md:block relative group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 text-sm rounded-full py-2.5 pl-10 pr-4 w-48 focus:w-64 transition-all duration-300 outline-none border border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-green-500/10 placeholder:text-slate-400"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" />
            </div>

            {/* Mobile Search Icon */}
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)} 
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Theme Toggle */}
            <div 
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full p-1 cursor-pointer transition-colors duration-300 flex-shrink-0 hover:bg-slate-300 dark:hover:bg-slate-600"
            >
              <motion.div 
                animate={{ x: darkMode ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-4 h-4 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm"
              >
                {darkMode ? <Moon size={10} className="text-blue-400" /> : <Sun size={10} className="text-orange-500" />}
              </motion.div>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
            
            {/* Auth Section */}
            {user ? (
              <div 
                className="relative z-50"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center font-bold text-xs border border-green-200 dark:border-green-800">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : <User size={14} />}
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden ring-1 ring-black/5"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.fullName || 'Valued Customer'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                          {user.mobile}
                        </p>
                      </div>

                      <div className="p-2">
                        <button 
                          onClick={() => { navigate('/my-orders'); setIsProfileOpen(false); }}
                          className="w-full text-left px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg flex items-center gap-3 transition-colors group"
                        >
                          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                            <Package size={16} />
                          </div>
                          <span className="font-medium">My Orders</span>
                        </button>
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex items-center gap-3 transition-colors group mt-1"
                        >
                          <div className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-md text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors">
                            <LogOut size={16} />
                          </div>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <User size={16} /> <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* Cart Icon with Badge */}
            <div 
              className="relative group cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={22} className="text-slate-600 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
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
                  placeholder="Search products..." 
                  className="w-full bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 outline-none border border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner"
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
            className="lg:hidden overflow-hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-xl absolute w-full left-0"
          >
            <div className="flex flex-col p-4 space-y-2">
              {['Home', 'Store', 'Categories', 'Bulk Inquiry'].map((item) => (
                <button 
                  key={item}
                  className="text-left px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 font-medium transition-colors flex justify-between items-center" 
                  onClick={() => { 
                    navigate(item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`); 
                    setIsOpen(false); 
                  }}
                >
                  {item}
                  <ChevronRight size={16} className="text-slate-400" />
                </button>
              ))}
              
              <div className="h-[1px] bg-gray-100 dark:bg-slate-800 my-2"></div>

              {user ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center font-bold text-sm">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{user.fullName || 'User'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user.mobile}</p>
                    </div>
                  </div>
                  <button 
                    className="text-left px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-3 font-medium" 
                    onClick={() => { navigate('/my-orders'); setIsOpen(false); }}
                  >
                    <Package size={18} className="text-blue-500" /> View Orders
                  </button>
                  <button 
                    className="text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 font-medium" 
                    onClick={handleLogout}
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <button 
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-2" 
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                >
                  <User size={18} /> Login / Register
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