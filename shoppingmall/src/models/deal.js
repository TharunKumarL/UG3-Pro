// models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  store: String,
  description: String,
  expiration: String,
  image: String
});

module.exports = mongoose.model('Deal', dealSchema);
