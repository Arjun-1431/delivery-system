// models/User.js
const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  password: { type: String, required: true },
  time_of_registration: { type: Number, default: DateTime.now().toMillis() }
});

module.exports = mongoose.model('User', userSchema);
