const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * PROTECT: Middleware to ensure the user is logged in
 * It verifies the JWT and attaches the live User object from the DB to req.user
 */
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch the most current user data from DB (Database-First approach)
      // We exclude the OTP and OTP expiry for security.
      const currentUser = await User.findById(decoded.id).select('-otp -otpExpires');

      if (!currentUser) {
        return res.status(401).json({ 
          message: 'The user belonging to this token no longer exists.' 
        });
      }

      // 5. Attach user to the request object
      req.user = currentUser;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Session expired. Please login again.' });
      }
      
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

/**
 * ADMIN ONLY: Middleware to restrict routes to Admin roles only
 * Must be used AFTER the protect middleware
 */
const adminOnly = (req, res, next) => {
  // If you store 'role' in your User model, check it here
  // For your current setup, you might check if the ID matches your admin ID 
  // or a specific field like isAdmin: true
  if (req.user && (req.user.role === 'admin' || req.user.isAdmin)) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

module.exports = { protect, adminOnly };