const express = require('express');
const router = express.Router();

const { db } = require('../../firebase/firebaseInit');
const { verifyFirebaseToken } = require('../../utils/authMiddleware');

// GET all flights for the authenticated user
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection('flights')
      .where('userId', '==', userId)
      .orderBy('departureTime')
      .get();

    const flights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json({ flights });
  } catch (error) {
    console.error('Error fetching flights:', error);
    return res.status(500).json({ error: 'Unable to fetch flights' });
  }
});

// GET one specific flight by ID, only if it belongs to the user
router.get('/:flightId', verifyFirebaseToken, async (req, res) => {
  try {
    const { flightId } = req.params;
    const userId = req.user.uid;

    if (!flightId) {
      return res.status(400).json({ error: 'Flight ID is required.' });
    }

    const docRef = db.collection('flights').doc(flightId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Flight not found.' });
    }

    const flightData = doc.data();

    if (flightData.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized access to this flight.' });
    }

    return res.status(200).json({ id: doc.id, ...flightData });
  } catch (error) {
    console.error('Error fetching flight:', error);
    return res.status(500).json({ error: 'Unable to fetch flight' });
  }
});

module.exports = router;
