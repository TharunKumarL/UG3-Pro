// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);