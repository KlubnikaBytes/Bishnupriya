import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Deals from './components/Deals';
import Categories from './components/Categories';
import Featured from './components/Featured';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Auth from './components/Auth'; // Import the new Auth page
import Contact from './components/Contact';

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

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300 antialiased">

          <Routes>
            {/* Route 1: The Main Shop Page */}
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />

            {/* Route 2: The Login/Signup Page */}
            <Route path="/login" element={<Auth />} />
            <Route path="/contact" element={
              <>
                {/* We reuse the Navbar and Footer for the contact page */}
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
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