// models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);
