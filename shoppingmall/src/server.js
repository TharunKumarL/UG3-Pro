const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Shop = require('./models/Shop');
const Deal = require('./models/Deal');
const Event = require('./models/Event');
const ShopOwner=require('./models/ShopOwner')
const Reservation=require('./models/reservation.js')
const adminAuth = require('./middleware/adminAuth');
const verifyAdmin = require('./middleware/verifyAdmin.js');
const SportRoute=require('./Routes/SportRoute.js')
// const availabilityRoute=require('./Routes/availabilityRoute.js')
// const reservationRoute=require('./Routes/reservationRoute.js')
require('dotenv').config();

const app = express();

const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
// Admin routes
app.use('/api/admin', adminAuth,verifyAdmin);
//Routes //Sport
app.use("/sport", SportRoute);
// //Routes //availabilityRoute
// app.use("/availabilty",availabilityRoute);
// //Routes //reservationRoute
// app.use("/reservation",reservationRoute);
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
    if (email === 'sportssection@gmail.com' && password === '1') {
      console.log("Sports Section Login successfully")
      const token = jwt.sign(
        { userId: 'sportsmanager', role: 'sportsmanager' }, // Use a special identifier for admin
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
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 
// Utility function to generate a random password
const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

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
app.get('/api/shopowners', async (req, res) => {
  try {
    const shopowners = await ShopOwner.find();
    res.json(shopowners);
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
//admin routes
app.get('/api/admin/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});
app.get('/api/admin/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    console.log('Fetched shops from DB:', shops); // Log fetched shops
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});
// Add a new shop
// Add a new shop
app.post('/api/admin/shops', async (req, res) => {
  const { name, location, contact, image } = req.body;

  if (!name || !location || !contact) {
    return res.status(400).json({ error: 'Name, location, and contact are required' });
  }

  try {
    const newShop = new Shop({ name, location, contact, image });
    await newShop.save();
    res.status(201).json(newShop);
  } catch (error) {
    console.error('Error adding shop:', error);
    res.status(500).json({ error: 'Failed to add shop: ' + error.message });
  }
});
// Route to add a shop owner
app.post('/add-shopowners/:shopId', async (req, res) => {
  const { name, email, contact } = req.body;
  const { shopId } = req.params;

  try {
    // Generate a random password for the shop owner
    const password = generatePassword();
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new shop owner
    const newShopOwner = new ShopOwner({
      name,
      email,
      contact,
      shop: shopId,
      password: hashedPassword, // Store hashed password
    });

    await newShopOwner.save();

    // Send the password to the shop owner's email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can use any email service like Gmail, Outlook, etc.
      auth: {
        user: 'tharunkumarlagisetty@gmail.com', // Your email
        pass: 'bjbt ovza dnuf ayyp',  // Your email password
      },
    });

    const mailOptions = {
      from: 'tharunkumarlagisetty22@gmail.com',
      to: email,
      subject: 'Your Shop Owner Account Password',
      text: `Hello ${name},\n\nYour account has been created successfully. Here is your password: ${password}\nPlease log in and change your password immediately.\n\nBest regards,\nShopping Mall Admin`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Shop owner added successfully' });

  } catch (error) {
    console.error('Error adding shop owner:', error);
    res.status(500).json({ error: 'Failed to add shop owner' });
  }
});
app.delete('/api/shopowners/:id', async (req, res) => {
  try {
    const shopOwner = await ShopOwner.findById(req.params.id);
    if (!shopOwner) {
      return res.status(404).json({ error: 'Shop owner not found' });
    }
    
    await shopOwner.remove();
    res.json({ message: 'Shop owner deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop owner:', error);
    res.status(500).json({ error: 'Failed to delete shop owner' });
  }
});

//shopOwner
app.post('/shopownerlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the shop owner by email
    const shopOwner = await ShopOwner.findOne({ email });

    if (!shopOwner) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, shopOwner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a token or return a success message
    // Option 1: Use JWT for token-based authentication
    const token = jwt.sign({ id: shopOwner._id, role: 'shopowner' },process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Option 2: Return success message (if you are not using JWT)
    res.json({
      message: 'Login successful',
      token: token, // Send token if you are using it
      shopOwner: { id: shopOwner._id, email: shopOwner.email }, // Or other required details
    });
    sessionStorage.setItem('shopOwnerId', shopOwner._id);
  } catch (error) {
    console.error('Error during shop owner login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//deals
app.get('/api/shopowner/deals', async (req, res) => {
  try {
    const deals = await Deal.find({}); // You can add filters if necessary for shop owners
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error });
  }
});
//adddeals
app.post('/api/shopowner/add-deal', async (req, res) => {
  try {
    const { store, description, expiration, image } = req.body;

    const newDeal = new Deal({
      store,
      description,
      expiration,
      image,
    });

    await newDeal.save();
    res.status(201).json({ message: 'Deal added successfully', deal: newDeal });
  } catch (error) {
    console.error('Error adding deal:', error);
    res.status(500).json({ message: 'Error adding deal' });
  }
});



// app.get('/api/shopowner/:id/shop-id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const shopOwner = await ShopOwner.findById(id).populate('shop'); // Populate the shop field
//     if (!shopOwner || !shopOwner.shop) {
//       return res.status(404).json({ message: 'Shop owner or shop not found' });
//     }
//     res.json({ shopId: shopOwner.shop._id });
//   } catch (error) {
//     console.error('Error fetching shop ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// app.get('/api/shopowner/shop-details/:ownerId', async (req, res) => {
//   const { ownerId } = req.params;

//   try {
//     const shopDetails = await Shop.findOne({ ownerId }); // Assuming 'ownerId' is the field in Shop model
//     if (!shopDetails) {
//       return res.status(404).json({ message: 'Shop not found' });
//     }
//     res.json(shopDetails);
//   } catch (error) {
//     console.error('Error fetching shop details:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
//Routes //Sport
app.use("/sport", SportRoute);


app.post('/availability', (req, res) => {
  const { date } = req.body;
  // Fetch the available tables based on the date from MongoDB or other database
  const availableTables = [
    { _id: 1, name: "Table 1", capacity: 4, location: "Patio", isAvailable: true },
    { _id: 2, name: "Table 2", capacity: 2, location: "Inside", isAvailable: false },
    { _id: 3, name: "Table 3", capacity: 6, location: "Bar", isAvailable: true },
    { _id: 4, name: "Table 4", capacity: 8, location: "Patio", isAvailable: true },
    { _id: 5, name: "Table 5", capacity: 4, location: "Inside", isAvailable: false },
    { _id: 6, name: "Table 6", capacity: 2, location: "Bar", isAvailable: true },
    { _id: 7, name: "Table 7", capacity: 10, location: "Patio", isAvailable: true },
    { _id: 8, name: "Table 8", capacity: 6, location: "Inside", isAvailable: false },
    { _id: 9, name: "Table 9", capacity: 4, location: "Bar", isAvailable: true },
    { _id: 10, name: "Table 10", capacity: 8, location: "Patio", isAvailable: true },
    { _id: 11, name: "Table 11", capacity: 2, location: "Inside", isAvailable: true },
    { _id: 12, name: "Table 12", capacity: 6, location: "Bar", isAvailable: false }
  ];
  res.json({ tables: availableTables });
});
app.post("/reservation", function(req, res, next) {
  // Ensure required fields are provided
  const { date, table, name, phone, email } = req.body;
  if (!date || !table || !name || !phone || !email) {
    return res.status(400).send("All fields are required.");
  }

  Day.findOne({ date: date }, (err, day) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (!day) {
      console.log("Day not found");
      return res.status(404).send("Day not found");
    }

    const selectedTable = day.tables.find(t => t._id == table);
    if (!selectedTable) {
      console.log("Table not found");
      return res.status(404).send("Table not found");
    }

    if (!selectedTable.isAvailable) {
      console.log("Table is already reserved");
      return res.status(400).send("Table is already reserved");
    }

    // Create a new reservation and update the table status
    selectedTable.reservation = new Reservation({
      name: name,
      phone: phone,
      email: email
    });
    selectedTable.isAvailable = false;

    day.save(err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to save reservation");
      } else {
        console.log("Reserved");
        return res.status(200).send("Added Reservation");
      }
    });
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
