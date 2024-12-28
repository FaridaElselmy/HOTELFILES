const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: false, // Optional for initial creation
    },
    guests: {
        type: Number,
        required: false, // Optional for the initial creation
    },
    checkInDate: {
        type: Date,
        required: false, // Required for initial creation
    },
    checkOutDate: {
        type: Date,
        required: false, // Required for initial creation
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,  // Link to the user who created the booking
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the date the booking is created
    },
});

// Create a model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
