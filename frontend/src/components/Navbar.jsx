import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, ShoppingCart, Menu, X, 
  User, LogOut, Package, ChevronDown, ChevronRight, 
  MapPin, Truck 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// --- IMPORTING THE NEW LOGO ---
import Logo from '../assets/Bishnupriya Electricals Logo.png';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { cart, logout, user } = useCart(); 
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout(); 
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const navTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-[100] w-full transition-all duration-500 ${
      isScrolled 
        ? 'py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-white/10' 
        : 'py-0 bg-white dark:bg-slate-950 border-b border-transparent'
    }`}>
      
      {/* 1. Desktop Top Bar */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-950 dark:bg-black text-white py-2 hidden xl:block"
          >
            <div className="max-w-[1440px] mx-auto px-12 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 text-emerald-400">
                  <Truck size={12} /> FREE SHIPPING ABOVE ₹5000
                </span>
                <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                  <MapPin size={12} /> TRACK ORDER
                </span>
              </div>
              <a href="tel:+919711090909" className="hover:text-emerald-400 transition-colors">
                SUPPORT: +91 97110 90909
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-4">
          
          {/* 2. Branding - UPDATED WITH LOGO IMAGE */}
          <div 
            onClick={() => navTo('/')} 
            className="flex items-center gap-3 cursor-pointer min-w-0 flex-1 xl:flex-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-xl flex items-center justify-center shadow-xl shrink-0 overflow-hidden p-1.5">
              <img 
                src={Logo} 
                alt="Bishnupriya Electricals" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col min-w-0">
              <h1 className="text-[14px] sm:text-lg xl:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight truncate">
                Bishnupriya <span className="text-emerald-600 dark:text-emerald-400">Electricals</span>
              </h1>
              <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-0.5 hidden sm:block">
                Precision & Power
              </p>
            </div>
          </div>

          {/* 3. Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-x-8 font-extrabold text-[15px] tracking-tight">
            {[
              { name: 'Home', path: '/' },
              { name: 'Online Store', path: '/store' },
              { name: 'Categories', path: '/categories' },
              { name: 'Bulk Inquiry', path: '/bulk-inquiry' }
            ].map((link) => (
              <button 
                key={link.name} 
                onClick={() => navTo(link.path)}
                className={`relative py-1 whitespace-nowrap transition-all ${
                  location.pathname === link.path 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="navline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* 4. Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Profile */}
            <div className="hidden md:block relative">
              {user ? (
                <div onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  <button className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                      {user.fullName?.[0]}
                    </div>
                    <ChevronDown size={14} className="dark:text-white mr-1" />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} 
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-100 dark:border-slate-800 p-2 overflow-hidden z-50"
                      >
                         <div className="px-4 py-3 border-b dark:border-slate-800 mb-1">
                          <p className="text-xs font-black dark:text-white truncate uppercase">{user.fullName}</p>
                        </div>
                        <button onClick={() => navTo('/my-orders')} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                          <Package size={16} className="text-emerald-500"/> My Orders
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                          <LogOut size={16}/> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={() => navTo('/login')} className="p-2 sm:p-2.5 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-700 transition-all">
                  <User size={18} />
                </button>
              )}
            </div>

            {/* Cart Icon */}
            <button onClick={() => navTo('/cart')} className="relative p-2 sm:p-2.5 bg-slate-950 dark:bg-white rounded-xl shadow-xl">
              <ShoppingCart size={18} className="text-white dark:text-slate-950" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white dark:border-slate-950 shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="xl:hidden p-2 text-slate-950 dark:text-white transition-all active:scale-90"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[110]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white dark:bg-slate-950 shadow-2xl z-[120] flex flex-col p-6">
               <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-4">
                 <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden p-1 shadow-md">
                   <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                 </div>
                 <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white transition-all active:rotate-90"><X size={20} /></button>
               </div>
               <div className="space-y-1">
                 {[
                   { name: 'Home', path: '/' }, 
                   { name: 'Online Store', path: '/store' }, 
                   { name: 'Categories', path: '/categories' }, 
                   { name: 'Bulk Inquiry', path: '/bulk-inquiry' }
                  ].map((link) => (
                   <button key={link.name} onClick={() => navTo(link.path)} className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all ${location.pathname === link.path ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-white'} text-sm font-black`}>
                     {link.name} <ChevronRight size={18} className={location.pathname === link.path ? 'text-emerald-600' : 'text-slate-300'} />
                   </button>
                 ))}
               </div>
               
               <div className="mt-auto pt-6 border-t dark:border-slate-800">
                  {!user ? (
                    <button onClick={() => navTo('/login')} className="w-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">Login / Signup</button>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Account</p>
                        <p className="text-sm font-black dark:text-white truncate">{user.fullName}</p>
                      </div>
                       <button onClick={() => navTo('/my-orders')} className="w-full py-3 font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 transition-all text-[10px] uppercase tracking-widest">My Orders</button>
                      <button onClick={handleLogout} className="w-full py-4 font-black text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-50 transition-all text-[10px] uppercase tracking-widest">Sign Out</button>
                    </div>
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