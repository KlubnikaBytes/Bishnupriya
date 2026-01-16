import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Premium Electrical Solutions",
    subtitle: "Powering your home with safety and style.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2070",
    color: "bg-blue-600"
  },
  {
    id: 2,
    title: "Luxury Lighting Collection",
    subtitle: "Illuminate your space with designer chandeliers.",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2070",
    color: "bg-amber-500"
  },
  {
    id: 3,
    title: "Industrial Grade Gear",
    subtitle: "Heavy-duty switchgear for professional projects.",
    // FIXED: Using a highly reliable image of an industrial electrical panel/meter
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070", 
    color: "bg-slate-700"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
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
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-white">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${slides[current].color}`}
            >
              New Arrival 2026
            </motion.span>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight max-w-2xl"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg"
            >
              {slides[current].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105">
                Shop Collection
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/30 transition-all">
                View Catalog
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all z-10"
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all z-10"
      >
        <ChevronRight size={30} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              current === index ? 'w-8 bg-blue-500' : 'w-4 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;