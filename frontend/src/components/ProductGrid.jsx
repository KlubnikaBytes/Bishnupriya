const ProductCard = ({ title, price, oldPrice, img }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-xl transition group">
    <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
      <img src={img} alt={title} className="w-full h-full object-contain group-hover:scale-110 transition duration-500" />
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale!</div>
    </div>
    <h3 className="font-semibold mb-2 dark:text-white truncate">{title}</h3>
    <div className="flex items-center gap-2">
      <span className="text-blue-600 font-bold">₹{price}</span>
      <span className="text-gray-400 line-through text-sm">₹{oldPrice}</span>
    </div>
    <button className="w-full mt-4 bg-gray-900 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Add to cart</button>
  </div>
);

export const Deals = () => (
  <section className="py-16 max-container px-6">
    <h2 className="text-3xl font-bold mb-8 dark:text-white">Today's Best Deals</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard title="Havells Foldable Hair Dryer" price="949" oldPrice="1,295" img="https://m.media-amazon.com/images/I/51Hk2H7p3HL._SL1000_.jpg" />
      <ProductCard title="Digital Multimeter VC97" price="1,483" oldPrice="2,472" img="https://m.media-amazon.com/images/I/61M6E7nO6HL._SL1100_.jpg" />
      <ProductCard title="Havells COB Downlight" price="1,300" oldPrice="1,840" img="https://m.media-amazon.com/images/I/61mO7KNoBHL._SL1500_.jpg" />
      <ProductCard title="Changeover Switch 4P" price="11,739" oldPrice="19,564" img="https://m.media-amazon.com/images/I/61NlU9M-kLL._SL1500_.jpg" />
    </div>
  </section>
);