import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle, Send } from 'lucide-react';

const BulkInquiry = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Bulk Orders & Corporate Enquiries
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Looking for large quantities for a project or retail? Get exclusive B2B pricing, dedicated support, and priority shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700">
          
          {/* Left: Contact Info & Benefits */}
          <div className="bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Partner With Us?</h3>
              <ul className="space-y-4 mb-12">
                {[
                  "Direct Manufacturer Pricing",
                  "Priority Shipping & Logistics",
                  "GST Invoicing & Credit Support",
                  "Dedicated Account Manager",
                  "Customized Project Solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-green-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Call Us (Mon-Sat)</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-green-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email Us</p>
                  <p className="font-semibold">b2b@bishnupriya.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-green-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Head Office</p>
                  <p className="font-semibold">Kolkata, West Bengal, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="p-10">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Request a Quote</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white" placeholder="Your Company Ltd." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Categories of Interest</label>
                <select className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white">
                  <option>Select a category...</option>
                  <option>LED Lighting & Panels</option>
                  <option>Switchgear & Circuit Protection</option>
                  <option>Wires & Cables</option>
                  <option>Switches & Sockets</option>
                  <option>Fans (Ceiling/Exhaust/Industrial)</option>
                  <option>Multiple Categories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message / Requirements</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-green-500 outline-none transition-all dark:text-white resize-none" placeholder="Please describe your requirements, approximate quantities, and project timeline..."></textarea>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30 transform hover:-translate-y-1">
                <Send size={20} /> Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkInquiry;