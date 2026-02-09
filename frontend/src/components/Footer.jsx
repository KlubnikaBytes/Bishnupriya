import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  // Helper for consistent link styling
  const linkStyle = "hover:text-white cursor-pointer transition hover:translate-x-1 duration-200";

  return (
    <footer className="bg-black text-white pt-16 pb-4 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center font-bold text-xl text-white">BE</div>
              <h2 className="text-xl font-bold tracking-tight">Bishnupriya Electrical</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering Dreams to You. Your one-stop shop for all electrical components, from industrial gear to luxury home lighting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li onClick={() => navigate('/')} className={linkStyle}>Home</li>
              <li onClick={() => navigate('/store')} className={linkStyle}>Store</li>
              <li onClick={() => navigate('/contact')} className="hover:text-green-500 cursor-pointer transition hover:translate-x-1 duration-200 font-medium">Contact Us</li>
              <li onClick={() => navigate('/my-orders')} className={linkStyle}>Check Order</li>
            </ul>
          </div>

          {/* Company Policy - ESSENTIAL FOR RAZORPAY */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li onClick={() => navigate('/about')} className={linkStyle}>About Us</li>
              <li onClick={() => navigate('/testimonials')} className={linkStyle}>Testimonials</li>
              <li onClick={() => navigate('/privacy-policy')} className={linkStyle}>Privacy Policy</li>
              <li onClick={() => navigate('/return-policy')} className={linkStyle}>Return Policy</li>
              <li onClick={() => navigate('/terms')} className={linkStyle}>Terms & Conditions</li>
            </ul>
          </div>

          {/* Socials & Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Socials</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <Facebook size={20} className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin size={20} className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-blue-300 cursor-pointer transition-colors" />
              <Mail size={20} className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
            <div className="flex gap-4">
              <Phone size={20} className="text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <MessageCircle size={20} className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 uppercase tracking-widest">
          <p>Copyright © 2026 Bishnupriya Electrical. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
             <p className="font-bold text-gray-400">GSTIN - 19AJNPG1966F1ZZ</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;