// middleware/adminAuth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (user && user.role === 'admin') {
      req.user = user; // Attach user to request object
      next(); // Proceed to the next middleware/route
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = adminAuth;
