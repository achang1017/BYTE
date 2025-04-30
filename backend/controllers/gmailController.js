const { getFlightEmails } = require('../services/gmailService');

exports.getFlights = async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const sortedFlights = await getFlightEmails(accessToken);

    // Select the closest upcoming flight
    const closestFlight = sortedFlights[0] || null;
    res.json([closestFlight]);
  } catch (err) {
    console.error('Error fetching Gmail flights:', err);
    res.status(500).json({ error: 'Failed to fetch Gmail flight info' });
  }
};