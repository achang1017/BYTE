const express = require('express');
const { getFlightEmails } = require('../../services/gmailService');
const router = express.Router();

router.get('/flights', async (req, res) => {
  const userToken = req.headers.authorization?.split(' ')[1];

  if (!userToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const flights = await getFlightEmails(userToken);
    res.json(flights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flight information' });
  }
});

module.exports = router;