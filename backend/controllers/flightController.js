const db = require('../firebase/firebaseInit'); // your Firestore setup
const dayjs = require('dayjs');

exports.getNextUpcomingFlight = async (req, res) => {
  const userId = req.params.userId;

  try {
    const snapshot = await db
      .collection('flights')
      .where('userId', '==', userId)
      .get();

    const flights = [];

    snapshot.forEach(doc => {
      flights.push({ id: doc.id, ...doc.data() });
    });

    const now = dayjs();

    const upcoming = flights
      .filter(f => f.departureTime && dayjs(f.departureTime).isAfter(now))
      .sort((a, b) => dayjs(a.departureTime) - dayjs(b.departureTime));

    if (!upcoming.length) {
      return res.status(404).json({ message: 'No upcoming flights' });
    }

    res.json(upcoming[0]); // ✅ Return closest one
  } catch (err) {
    console.error('Error fetching user flights:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
