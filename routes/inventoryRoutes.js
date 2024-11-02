// routes/inventoryRoutes.js
const express = require('express');
const { createInventory, getInventories, editInventory, deleteInventory } = require('../controllers/inventoryController');
const router = express.Router();

router.post('/', createInventory);
router.get('/', getInventories);
router.put('/:id', editInventory);
router.delete('/:id', deleteInventory);

module.exports = router;
