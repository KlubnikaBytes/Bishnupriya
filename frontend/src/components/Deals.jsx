import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ title, price, oldPrice, img }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all group">
    <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
      <img src={img} alt={title} className="max-h-full object-contain group-hover:scale-110 transition duration-500" />
      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">SALE!</div>
    </div>
    <h3 className="font-semibold text-sm mb-2 dark:text-white truncate">{title}</h3>
    <div className="flex items-center gap-2 mb-4">
      <span className="text-blue-600 font-bold font-mono">₹{price}</span>
      <span className="text-gray-400 line-through text-xs font-mono">₹{oldPrice}</span>
    </div>
    <button className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">
      <ShoppingCart size={16} /> Add to cart
    </button>
  </div>
);

const Deals = () => {
  const dealsData = [
    { title: "Premium Hair Dryer 1000W", price: "949", oldPrice: "1,295", img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
    { title: "Smart LED COB Downlight", price: "1,300", oldPrice: "1,840", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400" },
    { title: "Industrial Digital Multimeter", price: "2,448", oldPrice: "3,597", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400" },
    { title: "Modular Switch Plate 1M", price: "120", oldPrice: "180", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400" },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-8 dark:text-white border-l-4 border-blue-600 pl-4">Today's Best Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealsData.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </section>
  );
};

export default Deals;