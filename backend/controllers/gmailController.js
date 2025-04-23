const { getFlightEmails } = require('./gmailService');

exports.getFlights = async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const flights = await getFlightEmails(accessToken);

    const sortedFlights = flights
      .filter(f => f.departureTime && f.departureTime !== 'Unknown')
      .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));

    const closestFlight = sortedFlights[0] || null;
    res.json([closestFlight]);
  } catch (err) {
    console.error('Error fetching Gmail flights:', err);
    res.status(500).json({ error: 'Failed to fetch Gmail flight info' });
  }
};