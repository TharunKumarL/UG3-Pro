const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');


  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user information in request
    next(); // Continue to the next middleware or route
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = adminAuth;
