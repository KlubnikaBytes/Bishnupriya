import React from 'react';

const Featured = () => {
  const products = [
    { name: "Alkaline Water Purifier", price: "21,998", img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500" },
    { name: "Crystal Chandelier 10-Lamp", price: "1,99,999", img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500" },
    { name: "Heavy Duty Distribution Board", price: "2,849", img: "https://images.unsplash.com/photo-1558484663-962a0337ad9d?w=500" },
    { name: "Designer Wall Sconce", price: "4,799", img: "https://images.unsplash.com/photo-1513506494265-99b15e8c0dc0?w=500" }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 dark:text-white">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <img src={p.img} className="h-48 w-full object-cover rounded-xl mb-4" />
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{p.name}</h3>
              <p className="text-xl font-black dark:text-white">₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;