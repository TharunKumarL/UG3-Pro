const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Unauthorized. Invalid token.' });
    }

    // Assuming you set admin in the JWT payload
    if (decoded.role === 'admin') {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized access. Admins only.' });
    }
  });
};

module.exports = verifyAdmin;
