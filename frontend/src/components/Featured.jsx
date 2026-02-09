import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Loader2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. IMPORT STATIC DATA (Contains the working local images)
import { itemsData as staticItems } from '../data/itemsData';

const Featured = () => {
  const navigate = useNavigate();
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ENVIRONMENT VARIABLE ---
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      // A. Fetch Live Data from Backend
      const res = await fetch(`${API_BASE_URL}/api/admin/inventory`);
      const data = await res.json();
      
      const activeProducts = data.filter(item => !item.isDeleted);

      // B. IMAGE REPAIR & MERGE LOGIC
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

      // C. SELECTION STRATEGY
      // Target DIFFERENT products than the ones usually in Deals
      const targetIds = [
        "GL91285",    // Zolo Dual Color LED Panel
        "EZ9R35440",  // Schneider Easy9 RCCB 4-Pole
        "SCFZ101948", // Goldmedal Fabia Fan
        "IN8401"      // Schneider Zencelo Switch
      ];

      let items = targetIds.map(id => 
        productsWithLocalImages.find(p => p.id === id || p._id === id)
      ).filter(Boolean);

      // FALLBACK: If specific IDs aren't found, take products 5-8 
      // (to ensure they are different from the first 4 used in Deals)
      if (items.length === 0) {
        items = productsWithLocalImages.slice(4, 8);
      }

      setFeaturedData(items);
    } catch (err) {
      console.error("Error fetching featured products, using local fallback:", err);
      // FALLBACK to static items 5-8 if API fails
      setFeaturedData(staticItems.slice(4, 8));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatured();
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Curating Featured Collection...</p>
      </div>
    );
  }

  if (featuredData.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-900/30 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-emerald-600 rounded-full" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">Premium Selection</span>
            <div className="w-8 h-1 bg-emerald-600 rounded-full" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
            Featured <span className="text-emerald-600 not-italic">Products</span>
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {featuredData.map((product) => (
            <motion.div
              key={product._id || product.id}
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/product/${product._id || product.id}`)}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-2xl transition-all group flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-6">
                <img
                  src={product.image} 
                  alt={product.name}
                  className="max-h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700 flex items-center gap-1">
                   <Star size={10} className="fill-yellow-400 text-yellow-400" />
                   <span className="text-[10px] font-black dark:text-white">{product.rating || "4.8"}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {product.brand}
                </p>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base lg:text-lg leading-tight line-clamp-2 h-12">
                  {product.name}
                </h3>
                
                <div className="mt-4">
                  <span className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* View Product Button */}
              <button
                className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all group/btn border border-slate-100 dark:border-slate-700"
              >
                <Eye size={16} />
                View Details
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;