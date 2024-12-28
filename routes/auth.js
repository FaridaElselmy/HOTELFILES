const express = require('express');
const router = express.Router();

// Get Facilities
router.get('/facilities', (req, res) => {
    res.json({
        facilities: ['WiFi', 'Swimming Pool', 'Breakfast', 'Parking'],
    });
});

// Get About Us
router.get('/about', (req, res) => {
    res.json({ about: 'Welcome to our accommodation service!' });
});

module.exports = router;
