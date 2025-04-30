const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Secure Firestore-backed route to get user-specific flight data
const flightRoutes = require('./api/routes/flightRoutes');
app.use('/api/flights', flightRoutes); // ✅ Flights now come from Firestore, not Gmail

// Optional: Additional routes can go here
// const firestoreRoutes = require('./api/routes/firestoreRoutes');
// app.use('/api/firestore', firestoreRoutes);

// Server init
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});