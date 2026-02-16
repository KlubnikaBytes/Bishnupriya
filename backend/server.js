const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Load Environment Variables
dotenv.config();

// 2. Initialize MongoDB Connection
connectDB();

const app = express();

// --- MIDDLEWARE ---

/**
 * UNIVERSAL WIDE-OPEN CORS
 * This removes all domain restrictions and environment variable checks.
 * It will work on localhost, VPS, Render, or anywhere else automatically.
 */
app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200 
}));

/**
 * Optimized Body Parsers
 * Increased limits (50mb) handle larger data payloads for inventory syncs.
 */
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- API ROUTES ---

/**
 * CUSTOMER & ADMIN AUTHENTICATION
 */
app.use('/api/auth', require('./routes/authRoutes'));

/**
 * SHOPPING CART OPERATIONS
 */
app.use('/api/cart', require('./routes/cartRoutes'));

/**
 * INVENTORY & ADMIN DASHBOARD
 */
app.use('/api/admin', require('./routes/adminRoutes')); 

/**
 * BULK INQUIRY SYSTEM
 */
app.use('/api/inquiry', require('./routes/inquiryRoutes')); 

/**
 * RETAIL ORDER SYSTEM
 */
app.use('/api/orders', require('./routes/orderRoutes')); 

// --- GLOBAL ERROR HANDLING ---
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
    console.log(`📡 CORS: WIDE OPEN (*)`);
    console.log(`📡 AUTH ENDPOINTS:    /api/auth`);
    console.log(`🛠️  ADMIN ENDPOINTS:   /api/admin`);
});