import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: "Lighting", count: 257, img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400" },
  { name: "Cables", count: 73, img: "https://images.unsplash.com/photo-1558484663-962a0337ad9d?w=400" },
  { name: "Appliances", count: 42, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400" },
  { name: "Switchgear", count: 80, img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400" },
];

const Categories = () => (
  <section className="py-16 bg-gray-50 dark:bg-slate-900/50">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-10 dark:text-white">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={i} 
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-center cursor-pointer"
          >
            <div className="h-32 mb-4 overflow-hidden rounded-lg">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold dark:text-white">{cat.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{cat.count} Products</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;