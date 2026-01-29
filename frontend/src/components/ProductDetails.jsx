import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsData } from '../data/itemsData';
import { Star, ShoppingCart, ArrowLeft, Truck, Shield, RefreshCcw, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find product on mount
  useEffect(() => {
    const found = itemsData.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    }
    // Scroll to top when opening page
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/store')} className="text-green-500 hover:underline">
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/store')}
          className="flex items-center gap-2 text-slate-500 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Store
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* --- LEFT: Image Gallery --- */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm relative group">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all 
                    ${activeImage === index 
                      ? 'border-green-500 ring-2 ring-green-500/20' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Product Info --- */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300 dark:text-slate-600"} />
                ))}
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                ({product.reviews ? product.reviews.length : 0} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-black text-slate-900 dark:text-white">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-lg text-slate-400 line-through mb-2">
                ₹{(product.price * 1.2).toFixed(0)}
              </span>
              <span className="text-sm font-bold text-green-600 mb-2">
                20% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              {product.details}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl px-4 py-3 w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-green-600 text-slate-600 dark:text-slate-300 transition-colors">
                  <Minus size={20} />
                </button>
                <span className="mx-6 font-bold text-lg text-slate-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-green-600 text-slate-600 dark:text-slate-300 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              
              {/* UPDATED ADD TO CART BUTTON */}
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30 active:scale-95"
              >
                <ShoppingCart size={24} /> Add to Cart
              </button>
            </div>

            {/* Features / Services */}
            <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 dark:border-slate-800 py-6 mb-8">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-blue-50 dark:bg-slate-800 text-blue-600 rounded-full">
                  <Truck size={24} />
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-purple-50 dark:bg-slate-800 text-purple-600 rounded-full">
                  <Shield size={24} />
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-orange-50 dark:bg-slate-800 text-orange-600 rounded-full">
                  <RefreshCcw size={24} />
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Easy Returns</span>
              </div>
            </div>

            {/* Specifications Table */}
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">Specifications</h3>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                {product.specifications ? Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={key} className={`flex justify-between p-4 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-800/50' : ''}`}>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{key}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{value}</span>
                  </div>
                )) : (
                  <div className="p-4 text-slate-500">No specifications available.</div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-20">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{review.user}</h4>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-lg">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300 dark:text-slate-600"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm italic">
                    "{review.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                <p className="text-slate-500 dark:text-slate-400">No reviews yet for this product.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;