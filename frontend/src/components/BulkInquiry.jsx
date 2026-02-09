import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CheckCircle, Send, Loader2 } from 'lucide-react';
import { categories as staticCategories } from '../data/itemsData';

const BulkInquiry = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', companyName: '', email: '', mobile: '', category: '', message: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('${API_BASE_URL}/api/inquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSent(true);
        setFormData({ fullName: '', companyName: '', email: '', mobile: '', category: '', message: '' });
      }
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter italic">
            B2B <span className="text-emerald-500 not-italic">Partnerships</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Join our network for exclusive corporate pricing and dedicated logistics support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
          {/* Left Info Panel */}
          <div className="bg-slate-900 p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-emerald-400">Why Partner?</h3>
              <ul className="space-y-6">
                {["Direct B2B Pricing", "GST Ready Invoicing", "Priority Project Support", "Custom Logistics"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-300 font-bold">
                    <CheckCircle className="text-emerald-500" size={24} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-4">
                <Phone className="text-emerald-400" />
                <p className="font-bold">+91 97110 90909</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-emerald-400" />
                <p className="font-bold">klubnikabytes@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white dark:bg-slate-800 p-12">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-2xl font-black dark:text-white">Inquiry Received!</h2>
                <p className="text-slate-500">Our B2B team will contact you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Send another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Contact Person" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 ring-emerald-500" onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  <input placeholder="Company (Optional)" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 ring-emerald-500" onChange={e => setFormData({...formData, companyName: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="email" placeholder="Work Email" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 ring-emerald-500" onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input required placeholder="Mobile Number" className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 ring-emerald-500" onChange={e => setFormData({...formData, mobile: e.target.value})} />
                </div>
                <select required className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white outline-none focus:ring-2 ring-emerald-500" onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">Interest Category</option>
                  {staticCategories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  <option value="Complete Project">Complete Project Setup</option>
                </select>
                <textarea required rows="4" placeholder="Detailed Requirements..." className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 dark:text-white outline-none resize-none focus:ring-2 ring-emerald-500" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                <button disabled={loading} className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> REQUEST B2B QUOTE</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkInquiry;