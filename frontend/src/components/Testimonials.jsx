import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Aman Gupta",
    role: "Architect",
    text: "The selection of luxury lighting at Bishnupriya Electrical is unmatched. I always source my project fixtures from here for their quality and durability.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=aman"
  },
  {
    id: 2,
    name: "Sonia Chatterjee",
    role: "Interior Designer",
    text: "I highly recommend them for their professional service. Their collection of switches and modular plates perfectly complements modern home aesthetics.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sonia"
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Project Manager",
    text: "For industrial switchgear and heavy-duty cables, this is our go-to shop. Genuine products and very competitive pricing in the market.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=rajesh"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold dark:text-white mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all group"
            >
              <Quote className="absolute top-6 right-8 text-green-500/20 group-hover:text-green-500/40 transition-colors" size={40} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 italic mb-8 leading-relaxed">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                />
                <div>
                  <h4 className="font-bold dark:text-white leading-tight">{item.name}</h4>
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; // <--- The final critical export