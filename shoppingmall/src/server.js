const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Shop = require('./models/Shop');
const Deal = require('./models/Deal');
const Event = require('./models/Event');
// const ShopOwner = require('./models/ShopOwner');
const adminAuth = require('./middleware/adminAuth');
const verifyAdmin = require('./middleware/verifyAdmin.js');

require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use('/api/admin', adminAuth,verifyAdmin);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body; // Include role in signup if needed

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check for admin credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      console.log("Admin Login successfully")
      const token = jwt.sign(
        { userId: 'admin', role: 'admin' }, // Use a special identifier for admin
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ token });
    }

    // Check for regular user credentials
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Public routes
app.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

app.get('/api/getdeals', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});
// Server-side code
app.put('/api/shops/:id', async (req, res) => {
  const { id } = req.params;
  const { location, contact } = req.body;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(id, { location, contact }, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Failed to update shop' });
  }
});

// Admin routes
app.use('/api/admin', adminAuth);

// Admin route to add a shop
app.post('/api/admin/shops', verifyAdmin, async (req, res) => {
  try {
    const { name, location, contact, image } = req.body;

    // Create new shop
    const newShop = new Shop({
      name,
      location,
      contact,
      image,
    });

    await newShop.save();

    res.status(201).json({ message: 'Shop added successfully!' });
  } catch (error) {
    console.error('Error adding shop:', error);
    res.status(500).json({ error: 'Failed to add shop' });
  }
});

app.put('/api/admin/shops/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, description } = req.body;

  try {
    const shop = await Shop.findByIdAndUpdate(
      id,
      { name, location, description },
      { new: true }
    );
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/admin/shopowners', async (req, res) => {
  const { name, email, shopId } = req.body;

  if (!name || !email || !shopId) {
    return res.status(400).json({ error: 'Name, email, and shopId are required' });
  }

  try {
    const newShopOwner = new ShopOwner({ name, email, shopId });
    await newShopOwner.save();
    res.status(201).json({ message: 'ShopOwner added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/admin/shopowners/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, shopId } = req.body;

  try {
    const shopOwner = await ShopOwner.findByIdAndUpdate(
      id,
      { name, email, shopId },
      { new: true }
    );
    if (!shopOwner) {
      return res.status(404).json({ error: 'ShopOwner not found' });
    }
    res.json(shopOwner);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/admin/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

app.get('/api/admin/shopowners', async (req, res) => {
  try {
    const shopOwners = await ShopOwner.find();
    res.json(shopOwners);
  } catch (error) {
    console.error('Error fetching shop owners:', error);
    res.status(500).json({ error: 'Failed to fetch shop owners' });
  }
});

// Update shop details (admin route)
app.put('/api/admin/update-shop/:id', async (req, res) => {
  const { id } = req.params;
  const { location, contact } = req.body;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(id, { location, contact }, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Failed to update shop' });
  }
});
// Route to add a new shop (Admin only)
app.post('/api/admin/add-shop', async (req, res) => {
  const { name, location, contact, image } = req.body;

  if (!name || !location || !contact || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newShop = new Shop({
      name,
      location,
      contact,
      image
    });

    await newShop.save();
    res.status(201).json({ message: 'Shop added successfully', shop: newShop });
  } catch (error) {
    console.error('Error adding shop:', error);
    res.status(500).json({ error: 'Failed to add shop' });
  }
});
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
