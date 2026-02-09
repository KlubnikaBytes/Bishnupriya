import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Selected "Best Deal" items from your real-time inventory
const slides = [
  {
    id: 1,
    productId: "CS16A1MSW_WE", // Wiser Smart Switch
    brand: "Schneider Electric",
    title: "Wiser Smart Switch",
    subtitle: "Transform your home with WiFi-enabled control. Compatible with Alexa & Google Home.",
    image: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=2070",
    color: "bg-emerald-600"
  },
  {
    id: 2,
    productId: "SCFP301050", // Hush-Flo BLDC Fan
    brand: "Goldmedal",
    title: "Hush-Flo BLDC Fan",
    subtitle: "Experience silence. Premium energy-saving technology with remote control.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2070",
    color: "bg-amber-500"
  },
  {
    id: 3,
    productId: "EZ9F76332", // Easy9 MCB 3-Pole
    brand: "Schneider Electric",
    title: "Easy9 MCB 3-Pole",
    subtitle: "Industrial grade protection. 32A capacity with advanced breaking technology.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070",
    color: "bg-blue-600"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const handleViewProduct = () => {
    // Navigates to the specific product details page
    navigate(`/product/${slides[current].productId}`);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start text-white">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${slides[current].color}`}>
                Best Deal
              </span>
              <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                {slides[current].brand}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-2xl text-white"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg font-medium"
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-10">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full bg-white/10 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/10 transition-all active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full bg-white/10 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/10 transition-all active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-8 lg:left-12 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index ? 'w-12 bg-emerald-500' : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;