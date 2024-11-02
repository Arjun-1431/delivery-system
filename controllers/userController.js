// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, mobile, email, password, coordinates } = req.body;

    // Hash password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      coordinates,
      time_of_registration: DateTime.now().toMillis(),
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Debugging logs
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check JWT secret
    console.log("User ID:", user._id); // Check user ID during token generation
    console.log("Password:", password); // Check password when hashing

    res.status(201).json({
      message: 'User registered successfully',
      token // Send the token back to the client
    });
  } catch (error) {
    console.error("Registration error:", error); // Log the error for debugging
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};



// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check JWT secret
console.log("User ID:", user._id); // Check user ID during token generation
console.log("Password:", password); // Check password when hashing
console.log("Salt Rounds:", saltRounds); // Check salt rounds if using bcrypt
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Fetch All Users
exports.getUsers = async (req, res) => {
  try {
    const { sort, date } = req.query;
    let usersQuery = User.find();

    // Sorting by registration time
    if (sort === 'latest') usersQuery = usersQuery.sort({ time_of_registration: -1 });
    else if (sort === 'oldest') usersQuery = usersQuery.sort({ time_of_registration: 1 });

    // Filter by date
    if (date) {
      const [day, month, year] = date.split('/');
      const startOfDay = DateTime.fromObject({ day, month, year }).startOf('day').toMillis();
      const endOfDay = DateTime.fromObject({ day, month, year }).endOf('day').toMillis();
      usersQuery = usersQuery.where('time_of_registration').gte(startOfDay).lte(endOfDay);
    }

    const users = await usersQuery;
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// Edit User (Protected)
exports.editUser = async (req, res) => {
  const userId = req.user.userId;
  const { name, mobile, coordinates } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name, mobile, coordinates }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};
