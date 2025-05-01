const { getFlightEmails } = require('../services/gmailService');
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

exports.getFlights = async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const userEmail = req.headers['x-user-email']; // 🔄 Passed from frontend

  if (!accessToken || !userEmail) {
    return res.status(401).json({ error: 'Missing access token or user email' });
  }

  try {
    const sortedFlights = await getFlightEmails(accessToken);
    const closestFlight = sortedFlights[0] || null;

    // ✅ Store in Firestore
    if (closestFlight) {
      const tripRef = db.collection('users').doc(userEmail).collection('trips').doc('trip123');
      await tripRef.set({
        ...closestFlight,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }

    res.json([closestFlight]);
  } catch (err) {
    console.error('Error fetching Gmail flights:', err);
    res.status(500).json({ error: 'Failed to fetch Gmail flight info' });
  }
};