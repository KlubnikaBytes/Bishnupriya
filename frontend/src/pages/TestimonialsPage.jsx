import React from 'react';
import { motion } from 'framer-motion';
import Testimonials from '../components/Testimonials'; // Reusing your existing component

const TestimonialsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-black mb-4">Customer Stories</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          See why thousands of customers trust Bishnupriya Electrical for their industrial and home electrical needs.
        </p>
      </div>
      
      {/* Reusing your existing section */}
      <Testimonials />
      
      <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 className="text-3xl font-black text-emerald-500 mb-2">5000+</h3>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Happy Clients</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 className="text-3xl font-black text-emerald-500 mb-2">10+</h3>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Years Experience</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 className="text-3xl font-black text-emerald-500 mb-2">100%</h3>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Genuine Products</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialsPage;