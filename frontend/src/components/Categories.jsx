import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Fan, Server, Home, Shield, Sun } from 'lucide-react';
import { categories } from '../data/itemsData';

// Map categories to icons and specific cover images
const categoryConfig = {
  "LED Lighting": { 
    icon: <Sun size={24} />, 
    desc: "Energy-efficient panels, downlights, and lamps.",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop"
  },
  "Switchgear": { 
    icon: <Shield size={24} />, 
    desc: "MCBs, RCCBs, and circuit protection.",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop"
  },
  "Switches & Sockets": { 
    icon: <Zap size={24} />, 
    desc: "Premium modular switches and sockets.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop"
  },
  "Fans": { 
    icon: <Fan size={24} />, 
    desc: "Decorative, BLDC, and exhaust fans.",
    image: "https://tse3.mm.bing.net/th/id/OIP.mss4uFLbv791JfvRh0uH8QHaEO?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  "Distribution Boards": { 
    icon: <Server size={24} />, 
    desc: "SPN, TPN, and Vertical DBs.",
    image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=800&auto=format&fit=crop"
  },
  "Smart Home": { 
    icon: <Home size={24} />, 
    desc: "WiFi bulbs, smart plugs, and sensors.",
    image: "https://tse3.mm.bing.net/th/id/OIP.JyzY8HlMntCk4AVUqNxL1AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  "Industrial": { 
    icon: <Server size={24} />, 
    desc: "Heavy-duty plugs, sockets, and gear.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
  },
  "Outdoor Lighting": { 
    icon: <Sun size={24} />, 
    desc: "Floodlights, street lights, and garden lights.",
    image: "https://images.unsplash.com/photo-1517427677506-ade074eb1432?q=80&w=800&auto=format&fit=crop"
  }
};

const Categories = () => {
  const navigate = useNavigate();

  // Filter out "All" from the list for display
  const displayCategories = categories.filter(cat => cat !== "All");

  const handleCategoryClick = (category) => {
    // Navigate to store and pass the selected category in state
    navigate('/store', { state: { selectedCategory: category } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Explore Categories
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Browse our extensive range of electrical components organized for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((cat, index) => {
            const config = categoryConfig[cat] || { icon: <Zap />, desc: "Electrical essentials.", image: "" };
            
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleCategoryClick(cat)}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={config.image} 
                    alt={cat} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="mb-4 text-green-400 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {config.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {cat}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {config.desc}
                  </p>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    View Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;