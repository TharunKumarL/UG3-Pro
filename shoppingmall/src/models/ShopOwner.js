// models/ShopOwner.js
const mongoose = require('mongoose');

const shopOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
  },
  shops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the Shop model
  }],
});

const ShopOwner = mongoose.model('ShopOwner', shopOwnerSchema);

module.exports = ShopOwner;