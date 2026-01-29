import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ArrowUpRight, ChevronDown, Check, SlidersHorizontal, ShoppingCart, History, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { itemsData, categories } from '../data/itemsData'; 
import { useNavigate, useLocation } from 'react-router-dom';

const Store = ({ addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- BASIC STATE ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(itemsData);

  // --- SEARCH BAR STATE ---
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const searchContainerRef = useRef(null);

  // --- SORT & FILTER STATE ---
  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Calculate Price Range
  const maxPriceData = Math.max(...itemsData.map(item => item.price));
  const [priceRange, setPriceRange] = useState([0, maxPriceData]); 

  // --- HANDLE INCOMING NAVIGATION STATE (From Categories Page) ---
  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setActiveCategory(location.state.selectedCategory);
      // Clear state so refresh doesn't stick
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // --- FILTERING ENGINE ---
  useEffect(() => {
    let result = [...itemsData];

    // 1. Search Logic
    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        item.id.toLowerCase().includes(lowerQuery) ||
        item.brand.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
    } else {
      // 2. Category Filter
      if (activeCategory !== "All") {
        result = result.filter(item => item.category === activeCategory);
      }
    }

    // 3. Price Filter
    result = result.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

    // 4. Sorting Logic
    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredItems(result);
  }, [activeCategory, searchQuery, priceRange, sortBy]);


  // --- CLICK OUTSIDE HANDLER ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- SEARCH HANDLERS ---
  const addToHistory = (term) => {
    if (!term.trim()) return;
    const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSearchSelect = (item) => {
    addToHistory(item.name);
    navigate(`/product/${item.id}`);
  };

  const handleHistoryClick = (term) => {
    setSearchQuery(term);
    setIsSearchFocused(true); 
  };

  const clearHistory = (e) => {
    e.stopPropagation();
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // --- PRICE HANDLER ---
  const handlePriceChange = (e, index) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = value;
    if (index === 0 && value > priceRange[1]) return;
    if (index === 1 && value < priceRange[0]) return;
    setPriceRange(newRange);
  };

  // --- HELPERS ---
  const getSortLabel = () => {
    switch(sortBy) {
      case 'low-high': return 'Price: Low to High';
      case 'high-low': return 'Price: High to Low';
      default: return 'Recommended';
    }
  };

  const liveSuggestions = searchQuery.length > 0 
    ? itemsData.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-8 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4 tracking-tight">
          Product Catalog
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
          Premium electrical components for every requirement.
        </p>

        {/* --- SMART SEARCH BAR --- */}
        <div className="relative max-w-2xl z-40" ref={searchContainerRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, brand, or item code..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border shadow-lg shadow-slate-200/50 dark:shadow-none outline-none text-slate-700 dark:text-white transition-all
                ${isSearchFocused 
                  ? 'rounded-t-2xl border-green-500 ring-2 ring-green-500/20' 
                  : 'rounded-2xl border-gray-200 dark:border-slate-700'
                }`}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* SEARCH DROPDOWN */}
          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 bg-white dark:bg-slate-800 border-x border-b border-gray-200 dark:border-slate-700 rounded-b-2xl shadow-2xl overflow-y-auto max-h-96 z-50 custom-scrollbar"
              >
                {searchQuery.length === 0 ? (
                  // History View
                  <div className="p-2">
                    <div className="flex justify-between items-center px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white dark:bg-slate-800 z-10">
                      <span>Recent Searches</span>
                      {searchHistory.length > 0 && <button onClick={clearHistory} className="text-red-500 hover:underline">Clear</button>}
                    </div>
                    {searchHistory.length > 0 ? (
                      searchHistory.map((term, index) => (
                        <div key={index} onClick={() => handleHistoryClick(term)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer text-slate-700 dark:text-slate-200 rounded-lg transition-colors">
                          <History size={16} className="text-slate-400" />
                          <span>{term}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-slate-400 text-sm">No recent searches</div>
                    )}
                  </div>
                ) : (
                  // Live Results View
                  <div className="p-2">
                     <div className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white dark:bg-slate-800 z-10">
                      Suggested Products ({liveSuggestions.length})
                    </div>
                    {liveSuggestions.length > 0 ? (
                      liveSuggestions.map((item) => (
                        <div key={item.id} onClick={() => handleSearchSelect(item)} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer group border-b border-gray-50 dark:border-slate-700/50 last:border-0 rounded-lg transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-600 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-slate-600">
                            <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-800 dark:text-white truncate">{item.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <span>{item.brand}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-green-600 dark:text-green-400 font-bold">₹{item.price}</span>
                            </div>
                          </div>
                          <ArrowUpRight size={16} className="text-slate-300 group-hover:text-green-500" />
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-slate-400 text-sm">No products found</div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR (Filters) --- */}
        <div className="lg:w-1/4 flex-shrink-0 space-y-6">
          
          {/* Categories */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5 overflow-hidden">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
              <Filter size={20} className="text-green-500" /> Categories
            </h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                  className={`relative px-4 py-3 rounded-xl text-sm font-medium text-left transition-all whitespace-nowrap flex justify-between items-center group
                    ${activeCategory === cat && !searchQuery
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 shadow-sm ring-1 ring-green-500/20' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                    }`}
                >
                  {cat}
                  {activeCategory === cat && !searchQuery && (
                    <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-5">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              <span className="text-green-500 font-serif italic">₹</span> Price Range
            </h3>
            
            <div className="relative h-12 w-full flex items-center justify-center">
              {/* Custom Dual Slider Track */}
              <div className="absolute w-full h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                 <div 
                    className="absolute h-full bg-green-500"
                    style={{
                      left: `${(priceRange[0] / maxPriceData) * 100}%`,
                      right: `${100 - (priceRange[1] / maxPriceData) * 100}%`
                    }}
                 />
              </div>
              <input 
                type="range" min="0" max={maxPriceData} value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)}
                className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-500 [&::-webkit-slider-thumb]:shadow-md cursor-pointer z-10"
              />
              <input 
                type="range" min="0" max={maxPriceData} value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)}
                className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-green-500 [&::-webkit-slider-thumb]:shadow-md cursor-pointer z-20"
              />
            </div>

            <div className="flex justify-between items-center mt-2 text-sm font-bold text-slate-700 dark:text-slate-200">
               <div className="px-3 py-1 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">₹{priceRange[0]}</div>
               <div className="px-3 py-1 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">₹{priceRange[1]}</div>
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT (Grid) --- */}
        <div className="lg:w-3/4">
          
          {/* Top Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Found <span className="text-slate-900 dark:text-white font-bold">{filteredItems.length}</span> items
              </span>
              {(searchQuery || priceRange[0] > 0 || priceRange[1] < maxPriceData) && (
                <div className="h-4 w-[1px] bg-gray-300 dark:bg-slate-600 mx-2 hidden sm:block"></div>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                  Search: "{searchQuery}"
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] < maxPriceData) && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              )}
            </div>

            {/* Sort Menu */}
            <div className="relative" ref={sortRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:shadow-md transition-all w-full sm:w-auto justify-between"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-slate-400" />
                  {getSortLabel()}
                </span>
                <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden z-30"
                  >
                    {[
                      { label: 'Recommended', value: 'default' },
                      { label: 'Price: Low to High', value: 'low-high' },
                      { label: 'Price: High to Low', value: 'high-low' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors
                          ${sortBy === option.value 
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold' 
                            : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                          }`}
                      >
                        {option.label}
                        {sortBy === option.value && <Check size={16} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Product Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-300 relative"
                >
                  <div className="h-56 overflow-hidden relative bg-gray-50 dark:bg-slate-700">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-md text-slate-800 dark:text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
                      {item.brand}
                    </div>
                    
                    {/* Hover Overlay Buttons */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 items-center justify-center backdrop-blur-[1px]">
                       <button 
                         onClick={(e) => { e.stopPropagation(); navigate(`/product/${item.id}`); }}
                         className="bg-white text-slate-900 font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2 text-xs w-32 justify-center"
                       >
                          <ArrowUpRight size={14} /> View
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                         className="bg-green-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2 text-xs hover:bg-green-700 w-32 justify-center"
                       >
                          <ShoppingCart size={14} /> Add
                       </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] font-bold text-green-600 dark:text-green-400 mb-1 uppercase tracking-wider">
                      {item.category}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight mb-3 line-clamp-2 min-h-[3rem]">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-700 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">Price</p>
                        <span className="text-xl font-black text-slate-900 dark:text-white">
                          ₹{item.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
              <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-full mb-4">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-white">No items found</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto">
                We couldn't find any products matching your current filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setPriceRange([0, maxPriceData]); setActiveCategory("All"); }}
                className="mt-6 text-green-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;