import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We will contact you shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 text-center px-6">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Contact Us</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Have a project in mind or need bulk electrical supplies? We are here to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Contact Info & Map */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <MapPin className="text-green-500 mb-4" size={32} />
                <h3 className="font-bold text-lg dark:text-white mb-2">Visit Store</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Mohisgote, Kestopur,<br />
                  Kolkata, West Bengal 700102
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <Phone className="text-blue-500 mb-4" size={32} />
                <h3 className="font-bold text-lg dark:text-white mb-2">Call Support</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">+91 98765 43210</p>
                <p className="text-gray-400 text-xs">Mon - Sat, 9am - 8pm</p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <Mail className="text-orange-500 mb-4" size={32} />
                <h3 className="font-bold text-lg dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">sales@bishnupriya.com</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">support@bishnupriya.com</p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                <Clock className="text-purple-500 mb-4" size={32} />
                <h3 className="font-bold text-lg dark:text-white mb-2">Working Hours</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
                <p className="text-red-400 text-xs font-bold mt-1">Sunday Closed</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-slate-700">
              <iframe 
                title="Bishnupriya Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.083756269989!2d88.4285640750485!3d22.583320279484193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a5f6e69501%3A0x6b4f7b6b1b7b7b7b!2sMohisgote%2C%20Kestopur%2C%20Kolkata%2C%20West%20Bengal%20700102!5e0!3m2!1sen!2sin!4v1709620000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-700 h-fit">
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-green-500" size={28} />
              <h2 className="text-2xl font-bold dark:text-white">Send us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Message</label>
                <textarea 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 dark:text-white transition-all resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;