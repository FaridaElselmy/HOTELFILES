const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Route to handle dates
router.post('/booking/dates', async (req, res) => {
    const { checkInDate, checkOutDate } = req.body;

    if (!checkInDate || !checkOutDate) {
        return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }

    try {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkIn >= checkOut) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date' });
        }

        // Temporarily save dates in a new booking entry
        const newBooking = new Booking({
            checkInDate: checkIn,
            checkOutDate: checkOut,
        });

        await newBooking.save();

        res.status(201).json({
            message: 'Dates saved successfully',
            bookingId: newBooking._id, // Return bookingId for future use
        });
    } catch (error) {
        console.error('Error saving dates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get bookings within specified dates
router.get('/booking/dates', async (req, res) => {
    const { checkInDate, checkOutDate } = req.query;

    if (!checkInDate || !checkOutDate) {
        return res.status(400).json({ message: 'Check-in and check-out dates are required' });
    }

    try {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkIn >= checkOut) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date' });
        }

        // Find bookings that overlap with the provided date range
        const bookings = await Booking.find({
            checkInDate: { $lte: checkOut },
            checkOutDate: { $gte: checkIn },
        });

        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for the specified dates' });
        }

        res.status(200).json({
            message: 'Bookings retrieved successfully',
            bookings,
        });
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/booking/details', async (req, res) => {
    const { roomType, guests } = req.body;

    if (!roomType || !guests) {
        return res.status(400).json({ message: 'Room type and guests are required' });
    }

    try {
        // Create a new booking entry with the roomType and guests
        const newBooking = new Booking({
            roomType: roomType,
            guests: guests,
            // You can add more fields as needed (e.g., check-in/out dates)
        });

        await newBooking.save();

        res.status(201).json({
            message: 'Booking details saved successfully',
            bookingId: newBooking._id,  // Return bookingId for future use (optional)
        });
    } catch (error) {
        console.error('Error saving booking details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch all bookings
router.get('/booking/details', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Failed to fetch bookings.' });
    }
});

module.exports = router;