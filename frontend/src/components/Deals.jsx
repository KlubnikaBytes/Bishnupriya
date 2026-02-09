import React, { useState, useEffect } from 'react';
import { Eye, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// 1. IMPORT STATIC DATA (Contains the working local images)
import { itemsData as staticItems } from '../data/itemsData';

const Deals = () => {
  const navigate = useNavigate();
  const [dealsData, setDealsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ENVIRONMENT VARIABLE ---
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchDeals = async () => {
    try {
      setLoading(true);
      // Fetch Live Data from Backend
      const res = await fetch(`${API_BASE_URL}/api/admin/inventory`);
      const dbData = await res.json();
      
      const activeProducts = dbData.filter(item => !item.isDeleted);

      // 2. IMAGE REPAIR & MERGE LOGIC
      // We map through API data and replace images with local ones if the names match
      const productsWithLocalImages = activeProducts.map(dbItem => {
        const localMatch = staticItems.find(
          s => s.name.trim().toLowerCase() === dbItem.name.trim().toLowerCase()
        );
        return {
          ...dbItem,
          // PRIORITY: Use Local Image from assets if available, else fallback to DB
          image: localMatch ? localMatch.image : dbItem.image
        };
      });

      // 3. SELECTION STRATEGY
      // Try to find your specific "Best Deal" IDs first
      const targetIds = ["CS16A1MSW_WE", "SCFP301050", "GL9C0203112", "EZ9F76132"];
      let featuredDeals = targetIds.map(id => 
        productsWithLocalImages.find(p => p.id === id || p._id === id)
      ).filter(Boolean);

      // FALLBACK: If specific IDs aren't found, take the first 4 products
      if (featuredDeals.length === 0) {
        featuredDeals = productsWithLocalImages.slice(0, 4);
      }

      setDealsData(featuredDeals);
    } catch (err) {
      console.error("Error fetching deals, using local fallback:", err);
      // If API fails completely, show first 4 items from static data
      setDealsData(staticItems.slice(0, 4));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Deals...</p>
      </div>
    );
  }

  if (dealsData.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-1.5 h-8 bg-emerald-600 rounded-full" />
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          TODAY'S BEST <span className="text-emerald-600">DEALS</span>
        </h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        {dealsData.map((product) => (
          <motion.div
            key={product._id || product.id}
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/product/${product._id || product.id}`)}
            className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
          >
            {/* Sale Badge & Image Container */}
            <div className="relative aspect-square mb-6 overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-md shadow-lg uppercase">
                SALE!
              </div>
              <img
                src={product.image} 
                alt={product.name}
                className="max-h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 mb-6 min-w-0">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 truncate">
                {product.brand}
              </p>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight line-clamp-2 h-10">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-3 mt-3">
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  ₹{Number(product.price).toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 line-through font-bold italic">
                  ₹{(Number(product.price) * 1.3).toFixed(0)}
                </span>
              </div>
            </div>

            {/* View Product Button */}
            <button
              className="w-full flex items-center justify-center gap-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-4 rounded-xl text-[11px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all shadow-lg group/btn"
            >
              <Eye size={16} />
              View Product
              <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Deals;