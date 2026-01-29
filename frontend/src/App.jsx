import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Deals from './components/Deals';
import Categories from './components/Categories'; // Ensure this file exists as discussed
import Featured from './components/Featured';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Contact from './components/Contact';
import Store from './components/Store';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart'; 
import BulkInquiry from './components/BulkInquiry'; // Ensure this file exists as discussed

// Create a separate component for the Landing Page to keep Routes clean
const Home = ({ darkMode, setDarkMode }) => (
  <>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <Hero />
    <Brands />
    <main className="pb-20">
      <Deals />
      <Categories />
      <Featured />
      <Testimonials />
    </main>
    <Footer />
  </>
);

function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // --- CART LOGIC START ---
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add Item to Cart
  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // If exists, update quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      } else {
        // If new, add to array
        return [...prevCart, { ...product, qty: qty }];
      }
    });
    // You can replace this alert with a toast notification later
    alert(`${product.name} added to cart!`); 
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update Quantity (+/-)
  const updateQuantity = (id, delta) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };
  // --- CART LOGIC END ---

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300 antialiased">

          <Routes>
            {/* Route 1: Home Page */}
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />

            {/* Route 2: Login/Signup */}
            <Route path="/login" element={<Auth />} />
            
            {/* Route 3: Store Page (Pass addToCart) */}
            <Route path="/store" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cart.length} />
                <Store addToCart={addToCart} /> 
                <Footer />
              </>
            } />
            
            {/* Route 4: Product Details (Pass addToCart) */}
            <Route path="/product/:id" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cart.length} />
                <ProductDetails addToCart={addToCart} />
                <Footer />
              </>
            } />

            {/* Route 5: Cart Page */}
            <Route path="/cart" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cart.length} />
                <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                <Footer />
              </>
            } />
            
            {/* Route 6: Categories Page */}
            <Route path="/categories" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cart.length} />
                <Categories />
                <Footer />
              </>
            } />

            {/* Route 7: Bulk Inquiry Page */}
            <Route path="/bulk-inquiry" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cart.length} />
                <BulkInquiry />
                <Footer />
              </>
            } />

            {/* Route 8: Contact Page */}
            <Route path="/contact" element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} cartCount={cart.length} />
                <Contact />
                <Footer />
              </>
            } />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;