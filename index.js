  // index.js (Backend)
  const express = require('express');  // Import Express
  const app = express();  // Create an Express app
  const mongoose = require("mongoose")
  const cors = require('cors');  // Import CORS middleware

  app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
  app.use(express.json())

  app.listen(3000, () => {
    console.log('Backend server is running on http://localhost:3000/rooms');
  });
  const corsOptions = {
      origin: 'http://localhost:3000', // Frontend URL
      methods: ['GET'],
    };
    
    app.use(cors(corsOptions));
    