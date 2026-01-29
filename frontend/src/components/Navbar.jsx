import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, ShoppingCart, Search, Menu, X, 
  Phone, User, LogOut, Package, ChevronDown, ChevronRight, 
  MapPin, Truck 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode, cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserFromStorage = useCallback(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      return (token && userData) ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("auth-change"));
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const navTo = (path) => {
    navigate(path);
    setIsOpen(false);
    setMobileSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setUser(getUserFromStorage());
    const handleAuthChange = () => setUser(getUserFromStorage());
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [getUserFromStorage]);

  useEffect(() => {
    setUser(getUserFromStorage());
    setIsOpen(false);
  }, [location, getUserFromStorage]);

  return (
    // Sticky ensures it doesn't overlap the first section, but stays fixed on scroll
    <nav className={`sticky top-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl border-b border-white/20' 
        : 'py-0 bg-white dark:bg-slate-950 border-b border-transparent'
    }`}>
      
      {/* Top Bar - Solid Colors, disappears on scroll to maximize glass space */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-950 dark:bg-black text-white py-2.5 hidden sm:block"
          >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[12px] font-bold tracking-[0.15em] uppercase">
              <div className="flex items-center gap-8">
                <span className="flex items-center gap-2 text-emerald-400">
                  <Truck size={14} /> FREE SHIPPING ABOVE ₹5000
                </span>
                <span className="hidden md:flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                  <MapPin size={14} /> TRACK ORDER
                </span>
              </div>
              <a href="tel:+919711090909" className="hover:text-emerald-400 transition-colors">
                SUPPORT: +91 97110 90909
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex justify-between items-center gap-6 lg:gap-12">
          
          {/* Logo Branding - Authoritative Size */}
          <div onClick={() => navTo('/')} className="flex items-center gap-4 cursor-pointer group shrink-0">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-xl lg:text-3xl shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              BE
            </div>
            <div className="hidden xs:block">
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                Bishnupriya
              </h1>
              <p className="text-[10px] lg:text-[12px] text-emerald-600 dark:text-emerald-400 font-black tracking-[0.4em] uppercase mt-1">Electricals</p>
            </div>
          </div>

          {/* Desktop Navigation - Increased font for readability */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 font-bold text-[17px] tracking-tight">
            {[
              { name: 'Home', path: '/' },
              { name: 'Online Store', path: '/store' },
              { name: 'Categories', path: '/categories' },
              { name: 'Bulk Inquiry', path: '/bulk-inquiry' }
            ].map((link) => (
              <button 
                key={link.name} 
                onClick={() => navTo(link.path)}
                className={`relative py-2 transition-all duration-300 ${
                  location.pathname === link.path 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="navline" className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* User Interaction Suite */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Professional Search Input */}
            <div className="hidden md:block relative group">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search premium electricals..." 
                className="bg-slate-100 dark:bg-slate-800 dark:text-white text-[15px] font-medium rounded-2xl py-3 pl-12 pr-4 w-40 lg:w-60 xl:w-72 focus:w-80 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-500"
              />
            </div>

            {/* Mobile Search */}
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="md:hidden p-3 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
              {mobileSearchOpen ? <X size={24} /> : <Search size={24} />}
            </button>

            {/* Theme & Profile */}
            <div className="flex items-center gap-1 md:gap-3">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all active:scale-95"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="hidden sm:block relative">
                {user ? (
                  <div onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                    <button className="flex items-center gap-3 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                        {user.fullName?.[0].toUpperCase()}
                      </div>
                      <ChevronDown size={16} className="dark:text-white mr-1" />
                    </button>
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute right-0 mt-3 w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-3xl border dark:border-slate-800 p-2 z-50">
                          <div className="px-4 py-4 border-b dark:border-slate-800 mb-2">
                            <p className="text-sm font-black dark:text-white truncate">{user.fullName}</p>
                            <p className="text-[11px] text-slate-500 font-bold mt-1 tracking-wide">{user.mobile}</p>
                          </div>
                          <button onClick={() => navTo('/my-orders')} className="w-full flex items-center gap-4 px-4 py-3 text-[15px] font-bold dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"><Package size={20} className="text-emerald-500"/> My Orders</button>
                          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-[15px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-colors mt-1"><LogOut size={20}/> Sign Out</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button onClick={() => navTo('/login')} className="p-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                    <User size={22} />
                  </button>
                )}
              </div>
            </div>

            {/* Designer Cart Badge */}
            <button onClick={() => navTo('/cart')} className="relative p-3 bg-slate-900 dark:bg-white rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl">
              <ShoppingCart size={22} className="text-white dark:text-slate-950" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-slate-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 dark:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Drawer */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden mt-4 overflow-hidden">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  autoFocus
                  placeholder="Search premium products..." 
                  className="w-full bg-slate-100 dark:bg-slate-800 dark:text-white text-lg font-bold rounded-2xl py-4 pl-12 pr-4 outline-none border-2 border-transparent focus:border-emerald-500 shadow-inner"
                />
                <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Responsive Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[110]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[310px] bg-white dark:bg-slate-950 shadow-2xl z-[120] flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b dark:border-slate-800">
                <span className="text-xl font-black uppercase dark:text-white">Navigation</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white"><X size={26} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Online Store', path: '/store' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'Bulk Inquiry', path: '/bulk-inquiry' }
                ].map((link) => (
                  <button key={link.name} onClick={() => navTo(link.path)} className="w-full flex justify-between items-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-white text-[18px] font-black transition-all">
                    {link.name} <ChevronRight size={20} className="text-emerald-500" />
                  </button>
                ))}
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-900/50">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-2">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl">
                        {user.fullName?.[0].toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-lg font-black dark:text-white truncate">{user.fullName}</p>
                        <p className="text-xs text-slate-500 font-bold">{user.mobile}</p>
                      </div>
                    </div>
                    <button onClick={() => navTo('/my-orders')} className="w-full flex items-center gap-4 p-4 text-md font-black dark:text-white bg-white dark:bg-slate-800 rounded-2xl shadow-sm"><Package size={22} className="text-emerald-500"/> Order History</button>
                    <button onClick={handleLogout} className="w-full p-4 text-md font-black text-red-500 border-2 border-red-500/10 rounded-2xl">Sign Out</button>
                  </div>
                ) : (
                  <button onClick={() => navTo('/login')} className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-5 rounded-3xl text-lg shadow-xl">
                    LOG IN / SIGN UP
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
