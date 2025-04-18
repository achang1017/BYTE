const { fetchItineraryEmails } = require('../services/gmailService');

const getFlightsFromGmail = async (req, res) => {
  try {
    const userId = 'user123';
    const itineraries = await fetchItineraryEmails(userId);
    res.status(200).json(itineraries);
  } catch (err) {
    console.error('Error fetching Gmail itineraries:', err);
    res.status(500).json({ error: 'Failed to fetch Gmail itinerary data' });
  }
};

module.exports = { getFlightsFromGmail };

