const { getFlightEmails } = require('../services/gmailService');

exports.getFlightsFromGmail = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing Gmail access token' });
    }

    const flights = await getFlightEmails(token);

    if (!flights.length) {
      return res.status(404).json({ message: 'No flights found in Gmail' });
    }

    res.json(flights);
  } catch (err) {
    console.error('Controller error:', err.message);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
};
