import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // --- 1. SESSION DISPOSAL ---
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCart([]);
    setLoading(false);
  }, []);

  // --- 2. POST-PURCHASE CLEANUP ---
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // --- 3. REFRESH SYNC ENGINE ---
  /**
   * Prevents the "Reset to 1" bug by forcing the app to wait for MongoDB
   * to provide the true quantities before allowing any components to render.
   */
  useEffect(() => {
    const recoverAndSync = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        setUser(null);
        setCart([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Parallel fetching for performance
        const [userRes, cartRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          }),
          fetch(`${API_BASE_URL}/api/cart`, {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          })
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        } else if (userRes.status === 401) {
          return logout();
        }

        if (cartRes.ok) {
          const cartData = await cartRes.json();
          // HYDRATION: Set state with definitive DB data (e.g., your 13 items)
          setCart(cartData.items || []);
        }

      } catch (err) {
        console.error("Critical Sync Failure:", err);
      } finally {
        // Only stop loading once the data is safely in the state
        setLoading(false);
      }
    };

    recoverAndSync();
  }, [token, logout]);

  // --- 4. CART INTERACTIONS ---

  /**
   * FIXED ADD TO CART:
   * Prevents duplicate rows by merging quantities locally before the API call.
   */
  const addToCart = async (product, qty = 1) => {
    if (!token) {
      alert("Please sign in to manage your collection.");
      return;
    }

    const productId = product._id || product.id || product.productId;

    // OPTIMISTIC MERGE: Check if product already exists in current local state
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      // If it exists, update the count immediately in the UI
      setCart(prev => prev.map(item => 
        item.productId === productId ? { ...item, qty: item.qty + qty } : item
      ));
    } else {
      // If it's new, add it as a fresh row
      setCart(prev => [...prev, { ...product, productId, qty }]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          name: product.name,
          price: product.price,
          image: product.image || (product.images && product.images[0]),
          brand: product.brand,
          category: product.category,
          qty
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Sync local state with the actual server data to be safe
        setCart(data.items);
      }
    } catch (err) {
      console.error("Database Add Error:", err);
    }
  };

  const updateQuantity = async (productId, delta) => {
    const item = cart.find(i => i.productId === productId);
    if (!item) return;

    const newQty = Math.max(1, item.qty + delta);

    // OPTIMISTIC UI: Instant visual update
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, qty: newQty } : i));

    try {
      const res = await fetch(`${API_BASE_URL}/api/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, qty: newQty })
      });
      
      if (!res.ok) throw new Error("Sync failed");
    } catch (err) {
      console.error("Quantity Sync Error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.items);
      }
    } catch (err) {
      console.error("Removal Error:", err);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, user, token, setToken, logout, clearCart,
      addToCart, updateQuantity, removeFromCart, setCart, loading 
    }}>
      {/* THE BLOCKER: Ensures no rendering occurs with an empty state */}
      {!loading ? children : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
           <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Synchronizing Secure Session...</p>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);