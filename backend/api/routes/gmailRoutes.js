const express = require('express');
const { getFlightEmails } = require('../../services/gmailService');
const { auth } = require('firebase-admin');
const { db } = require('../../firebase/firebaseInit');

const router = express.Router();

router.get('/flights', async (req, res) => {
  const { email } = req.query;

  const userToken = req.headers.authorization?.split(' ')[1];

  if (!userToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const flights = await getFlightEmails(userToken);

    // Store the response in Firestore
    const batch = db.batch();
    flights.forEach((flight) => {
      const flightRef = db.collection('users').doc(email).collection('trips').doc(flight.flightNumber ?? 'unknown');
      batch.set(flightRef, flight);
    });
    await batch.commit();

    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flight information' });
  }
});

module.exports = router;