const verifyAdmin = (req, res, next) => {
  console.log(req)
  if (req.user && req.user.role === 'admin') {
    console.log("Admin Verified Successfully")
    next(); // Allow access if user is admin
  } else {
    res.status(403).json({ message: 'Access Denied: Admins only' });
  }
};

module.exports = verifyAdmin;
