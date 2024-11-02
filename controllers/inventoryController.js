// controllers/inventoryController.js
const Inventory = require('../models/Inventory');

// Create Inventory
exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json({ message: 'Inventory created successfully', inventory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create inventory', error: error.message });
  }
};

// Fetch All Inventories
exports.getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventories', error: error.message });
  }
};

// Edit Inventory
exports.editInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, req.body, { new: true });
    if (!updatedInventory) return res.status(404).json({ message: 'Inventory not found' });
    res.json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update inventory', error: error.message });
  }
};

// Delete Inventory
exports.deleteInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    await Inventory.findByIdAndDelete(inventoryId);
    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete inventory', error: error.message });
  }
};
