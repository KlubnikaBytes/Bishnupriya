import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, ShoppingCart, Menu, X, 
  User, LogOut, Package, ChevronDown, ChevronRight, 
  MapPin, Truck, Zap 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// --- LOGO IMPORT ---
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
    // Increased threshold slightly for better stability
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Fixed: Added bg-white and dark:bg-slate-950 to the base class to prevent 
    // content from being visible through the navbar before the blur kicks in.
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
      isScrolled 
        ? 'py-2 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-xl border-b border-slate-200/50 dark:border-white/5' 
        : 'py-0 bg-white dark:bg-slate-950 border-b border-transparent'
    }`}>
      
      {/* 1. Global Utility Bar (Desktop) */}
      {/* Fixed: Wrapped in a div with fixed height to prevent layout shift */}
      <div className="hidden xl:block">
        <AnimatePresence>
          {!isScrolled && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 36, opacity: 1 }} // Fixed height to prevent "jitter"
              exit={{ height: 0, opacity: 0 }}
              className="bg-slate-900 text-white overflow-hidden border-b border-white/5"
            >
              <div className="max-w-[1440px] mx-auto px-12 h-full flex justify-between items-center text-[9px] font-black tracking-[0.25em] uppercase">
                <div className="flex items-center gap-8">
                  <span className="flex items-center gap-2 text-emerald-400">
                    <Truck size={12} strokeWidth={3} /> Complimentary Shipping Over ₹5000
                  </span>
                  <span className="flex items-center gap-2 hover:text-emerald-400 transition-all cursor-pointer opacity-80 hover:opacity-100">
                    <MapPin size={12} /> Logistics Tracking
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="opacity-60 italic normal-case tracking-normal">Bishnupriya Institutional Sales</span>
                  <a href="tel:+919711090909" className="text-emerald-400 hover:text-white transition-colors">
                    +91 97110 90909
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 xl:px-12 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-8">
          
          {/* 2. Brand Identity */}
          <div 
            onClick={() => navTo('/')} 
            className="flex items-center gap-4 cursor-pointer min-w-0 flex-1 xl:flex-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/10 shrink-0 overflow-hidden p-2 border border-slate-100 dark:border-white/10 transition-transform group-hover:scale-105">
              <img 
                src={Logo} 
                alt="Bishnupriya" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col min-w-0">
              <h1 className="text-[15px] sm:text-lg font-serif text-slate-900 dark:text-white leading-tight truncate">
                Bishnupriya <span className="text-emerald-500 font-sans font-black uppercase text-[11px] sm:text-xs tracking-tighter">Electricals</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Zap size={10} className="text-emerald-500 fill-emerald-500" />
                <p className="text-[7px] sm:text-[8px] text-slate-400 font-black tracking-[0.3em] uppercase">
                  Precision & Power
                </p>
              </div>
            </div>
          </div>

          {/* 3. Navigation Architecture */}
          <div className="hidden xl:flex items-center gap-x-10 font-bold text-[13px] tracking-widest uppercase">
            {[
              { name: 'Home', path: '/' },
              { name: 'Store', path: '/store' },
              { name: 'Categories', path: '/categories' },
              { name: 'B2B Inquiry', path: '/bulk-inquiry' }
            ].map((link) => (
              <button 
                key={link.name} 
                onClick={() => navTo(link.path)}
                className={`relative py-1 whitespace-nowrap transition-all duration-300 hover:text-emerald-500 ${
                  location.pathname === link.path 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div layoutId="navline" className="absolute -bottom-2 left-0 right-0 h-[2px] bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* 4. Interactive Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-500 hover:text-emerald-500 border border-slate-200/50 dark:border-white/5 transition-all active:scale-95"
            >
              {darkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            </button>

            {/* Profile Matrix */}
            <div className="hidden md:block relative">
              {user ? (
                <div onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                  <button className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                      {user.fullName?.[0]}
                    </div>
                    <ChevronDown size={14} className="dark:text-white opacity-40 mr-1" />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                        className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 shadow-2xl rounded-[2rem] border border-slate-100 dark:border-white/10 p-3 z-50 overflow-hidden"
                      >
                         <div className="px-5 py-4 border-b dark:border-white/5 mb-2">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Account</p>
                          <p className="text-sm font-serif dark:text-white truncate">{user.fullName}</p>
                        </div>
                        <button onClick={() => navTo('/my-orders')} className="w-full flex items-center gap-4 px-5 py-3 text-[11px] font-black tracking-widest uppercase dark:text-slate-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 rounded-2xl transition-all">
                          <Package size={16}/> My Orders
                        </button>
                        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3 text-[11px] font-black tracking-widest uppercase text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all mt-1">
                          <LogOut size={16}/> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={() => navTo('/login')} className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  <User size={20} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* Cart Sphere */}
            <button onClick={() => navTo('/cart')} className="relative group p-2.5 bg-slate-900 dark:bg-white rounded-2xl shadow-2xl active:scale-95 transition-all">
              <ShoppingCart size={20} strokeWidth={2.5} className="text-white dark:text-slate-900" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-slate-950 animate-in fade-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Trigger */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="xl:hidden p-2 text-slate-900 dark:text-white transition-all active:rotate-90"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[110]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[320px] bg-white dark:bg-slate-950 shadow-2xl z-[120] flex flex-col p-8">
                <div className="flex justify-between items-center mb-12">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg p-2 border border-slate-100">
                      <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                   </div>
                   <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl dark:text-white"><X size={24} /></button>
                </div>
                
                <div className="space-y-2">
                  {[
                    { name: 'Home', path: '/' }, 
                    { name: 'Store Catalog', path: '/store' }, 
                    { name: 'Categories', path: '/categories' }, 
                    { name: 'B2B Inquiry', path: '/bulk-inquiry' }
                   ].map((link) => (
                    <button key={link.name} onClick={() => navTo(link.path)} className={`w-full flex justify-between items-center p-5 rounded-[1.5rem] transition-all ${location.pathname === link.path ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-white'} text-[12px] font-black uppercase tracking-widest`}>
                       {link.name} <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
                
                <div className="mt-auto pt-8 border-t dark:border-white/5">
                   {!user ? (
                     <button onClick={() => navTo('/login')} className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-black py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-2xl">Access Account</button>
                   ) : (
                     <div className="space-y-4">
                       <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5">
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Authenticated As</p>
                         <p className="text-lg font-serif dark:text-white">{user.fullName}</p>
                       </div>
                       <button onClick={() => navTo('/my-orders')} className="w-full py-4 font-black text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 rounded-2xl text-[10px] uppercase tracking-widest">My Orders</button>
                       <button onClick={handleLogout} className="w-full py-4 font-black text-red-500 border border-red-500/10 rounded-2xl bg-red-50 dark:bg-red-500/5 text-[10px] uppercase tracking-widest">Sign Out</button>
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