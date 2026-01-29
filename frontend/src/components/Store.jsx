import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, Filter, X, ArrowUpRight, ChevronDown, Check, 
  SlidersHorizontal, ShoppingCart, History, ChevronRight, 
  ArrowUpDown, RotateCcw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { itemsData, categories } from '../data/itemsData'; 
import { useNavigate, useLocation } from 'react-router-dom';

const Store = ({ addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(itemsData);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const maxPriceData = Math.max(...itemsData.map(item => item.price));
  const [priceRange, setPriceRange] = useState([0, maxPriceData]);

  // --- RECOVERY LOGIC (From Navigation) ---
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setActiveCategory(location.state.selectedCategory);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // --- FILTER ENGINE ---
  useEffect(() => {
    let result = [...itemsData];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    } else if (activeCategory !== "All") {
      result = result.filter(item => item.category === activeCategory);
    }

    result = result.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

    if (sortBy === "low-high") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "high-low") result.sort((a, b) => b.price - a.price);

    setFilteredItems(result);
  }, [activeCategory, searchQuery, priceRange, sortBy]);

  const resetFilters = () => {
    setActiveCategory("All");
    setPriceRange([0, maxPriceData]);
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 pb-20 lg:pb-10">
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-4">
              Premium <span className="text-emerald-600">Catalogue</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-lg max-w-2xl font-medium">
              Explore our curated collection of high-performance electrical solutions from world-class brands.
            </p>
          </motion.div>

          {/* Search Bar Integration */}
          <div className="mt-8 max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search by model, brand, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-2 border-transparent shadow-xl dark:shadow-none focus:border-emerald-500 rounded-2xl py-4 pl-12 pr-4 outline-none text-slate-900 dark:text-white transition-all font-bold"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- DESKTOP SIDEBAR (Filters) --- */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-28 h-fit">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                      activeCategory === cat 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat} <ChevronRight size={14} className={activeCategory === cat ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Price Range</h3>
                <span className="text-xs font-bold text-emerald-600">₹{priceRange[1]}</span>
              </div>
              <input 
                type="range" min="0" max={maxPriceData} value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
              />
            </div>

            <button onClick={resetFilters} className="w-full flex items-center justify-center gap-2 py-4 text-xs font-black uppercase text-slate-400 hover:text-red-500 transition-colors border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <RotateCcw size={14} /> Reset Filters
            </button>
          </aside>

          {/* --- MAIN GRID AREA --- */}
          <main className="flex-1">
            
            {/* Mobile Category Scroller */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap text-xs font-black uppercase tracking-tighter border-2 transition-all ${
                    activeCategory === cat 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Header */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
                Showing <span className="text-slate-900 dark:text-white">{filteredItems.length}</span> Masterpieces
              </p>
              
              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:block relative group">
                <button className="flex items-center gap-3 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm">
                  <ArrowUpDown size={16} /> Sort By
                </button>
              </div>
            </div>

            {/* Myntra-Style 2 Column Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-6">
                <AnimatePresence>
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="bg-white dark:bg-slate-900 rounded-2xl lg:rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all flex flex-col"
                    >
                      {/* Card Image */}
                      <div className="aspect-[4/5] overflow-hidden relative bg-slate-50 dark:bg-slate-800">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 lg:top-4 lg:left-4">
                          <span className="bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-2 py-1 lg:px-3 lg:py-1 rounded-lg text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border border-white/20">
                            {item.brand}
                          </span>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-3 lg:p-6 flex flex-col flex-1">
                        <span className="text-[9px] lg:text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">
                          {item.category}
                        </span>
                        <h3 className="font-bold text-slate-800 dark:text-white text-xs lg:text-lg leading-tight mb-3 line-clamp-2 h-8 lg:h-14">
                          {item.name}
                        </h3>
                        
                        <div className="mt-auto flex items-center justify-between pt-2 lg:pt-4 border-t border-slate-50 dark:border-slate-800">
                          <span className="text-sm lg:text-2xl font-black text-slate-900 dark:text-white">
                            ₹{item.price.toLocaleString()}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                            className="w-8 h-8 lg:w-12 lg:h-12 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                          >
                            <ShoppingCart size={16} className="lg:hidden" />
                            <ShoppingCart size={22} className="hidden lg:block" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <Search size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-black dark:text-white uppercase italic">No Match Found</h3>
                <p className="text-slate-500 mt-2 font-bold uppercase text-xs tracking-widest">Refine your search parameters</p>
                <button onClick={resetFilters} className="mt-8 text-emerald-600 font-black uppercase text-sm border-b-2 border-emerald-600">View All Items</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- MOBILE ACTION BAR (Sticky Bottom) --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex z-[80] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => setIsSortOpen(true)}
          className="flex-1 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-800"
        >
          <ArrowUpDown size={18} className="text-emerald-500" /> Sort
        </button>
        <button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white"
        >
          <Filter size={18} className="text-emerald-500" /> Filter
        </button>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 rounded-t-[40px] z-[110] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase tracking-tighter dark:text-white">Refine Search</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl dark:text-white"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Select Category</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)}
                        className={`py-4 px-4 rounded-2xl text-[13px] font-black uppercase tracking-tighter border-2 transition-all ${
                          activeCategory === cat 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Max Price</h3>
                    <span className="text-xl font-black text-emerald-600">₹{priceRange[1]}</span>
                  </div>
                  <input type="range" max={maxPriceData} value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 flex gap-4">
                <button onClick={resetFilters} className="flex-1 py-5 font-black uppercase text-xs text-slate-400 tracking-widest">Clear All</button>
                <button onClick={() => setIsMobileFilterOpen(false)} className="flex-[2] bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black py-5 rounded-3xl text-sm shadow-2xl">Apply Results</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MOBILE SORT DRAWER --- */}
      <AnimatePresence>
        {isSortOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSortOpen(false)} className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 rounded-t-[40px] z-[110] p-8 shadow-2xl">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Sort Order</h2>
              <div className="space-y-2">
                {[
                  { label: 'Recommended', value: 'default' },
                  { label: 'Price: Low to High', value: 'low-high' },
                  { label: 'Price: High to Low', value: 'high-low' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                    className={`w-full flex justify-between items-center p-5 rounded-2xl font-black text-sm uppercase tracking-tight transition-all ${
                      sortBy === option.value 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' 
                      : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {option.label}
                    {sortBy === option.value && <Check size={18} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;
