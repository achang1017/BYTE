// This controller is no longer used. All flight fetching is now done from Firestore.
// You can safely remove this file and its route.

const { getFlightEmails } = require('./gmailService');

exports.getFlights = async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const flights = await getFlightEmails(accessToken);

    const now = new Date();
    const recentFlights = flights.filter(f => {
      const flightDate = new Date(f.departureTime);
      return flightDate >= new Date(now - 14 * 24 * 60 * 60 * 1000); // Last 14 days
    });

    const sortedFlights = recentFlights
      .filter(f => f.departureTime && f.departureTime !== 'Unknown')
      .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));

    const closestFlight = sortedFlights[0] || null;
    res.json([closestFlight]);
  } catch (err) {
    console.error('Error fetching Gmail flights:', err);
    res.status(500).json({ error: 'Failed to fetch Gmail flight info' });
  }
};