// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUsers, editUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.put('/edit', authMiddleware, editUser);
router.delete('/:id', deleteUser);

module.exports = router;
