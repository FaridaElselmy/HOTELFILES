const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// User registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
});

// User login (without JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        req.session.userId = user._id; // This creates a session with the user ID
        console.log('User logged in with session ID:', req.sessionID); //

        // No JWT token generated, just return success message
        res.status(200).json({
            message: 'Login successful',
            userId: user._id,  // Send the userId to the frontend
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to log in', error: error.message });
    }
});

module.exports = router;
