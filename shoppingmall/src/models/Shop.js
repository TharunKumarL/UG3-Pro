// models/Shop.js
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: false,
  },
  image: {
    type: String, // Store image path as a string
    required: true,
  },
  owner: {
    type: String,
  },
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
