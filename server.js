const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const bookingRoutes = require('./routes/booking');
const usersRoute = require("./routes/users");

const cors = require('cors');



// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use booking routes
app.use("/api", bookingRoutes);
app.use("/api",usersRoute);




// Basic route for testing
app.get('/', (req, res) => {
  res.send("Hello, MongoDB is connected!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
