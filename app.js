// app.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/inventories', inventoryRoutes);

module.exports = app;
