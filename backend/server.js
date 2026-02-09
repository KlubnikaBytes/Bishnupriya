const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables (JWT_SECRET, MONGO_URI, etc.)
dotenv.config();

// Initialize MongoDB Connection
connectDB();

const app = express();

// --- MIDDLEWARE ---

/**
 * 1. CORS Configuration
 * Allows your Vite frontend (port 5173) to communicate with this Express server.
 */
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

/**
 * 2. Optimized Body Parsers
 * Increased limits (50mb) handle larger data payloads, such as inventory syncs.
 */
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API ROUTES ---

/**
 * CUSTOMER & ADMIN AUTHENTICATION
 * Handles user login, OTP verification, and profile synchronization.
 */
app.use('/api/auth', require('./routes/authRoutes'));

/**
 * SHOPPING CART OPERATIONS
 * Manages persistent items and quantities stored in MongoDB.
 */
app.use('/api/cart', require('./routes/cartRoutes'));

/**
 * INVENTORY & ADMIN DASHBOARD
 * Handles product management, admin leads, and the recycle bin logic.
 */
app.use('/api/admin', require('./routes/adminRoutes')); 

/**
 * BULK INQUIRY SYSTEM
 * Manages B2B corporate leads and inquiry submissions.
 */
app.use('/api/inquiry', require('./routes/inquiryRoutes')); 

/**
 * RETAIL ORDER SYSTEM
 * Handles fetching user order history and creating new orders.
 * Mounting this route resolves the 404/SyntaxError in the "My Activity" section.
 */
app.use('/api/orders', require('./routes/orderRoutes')); 

// --- GLOBAL ERROR HANDLING ---
/**
 * Catch-all middleware to handle route errors and prevent server crashes.
 */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 BP SERVER LIVE ON PORT: ${PORT}`);
    console.log(`📡 AUTH ENDPOINTS:    /api/auth`);
    console.log(`📦 CART ENDPOINTS:    /api/cart`);
    console.log(`🛠️  ADMIN ENDPOINTS:   /api/admin`);
    console.log(`✉️  INQUIRY ENDPOINTS: /api/inquiry`);
    console.log(`🧾 ORDER ENDPOINTS:   /api/orders`);
});