const express = require('express');
const { getFlights } = require('../../controllers/gmailController');
const router = express.Router();

router.get('/flights', getFlights);

module.exports = router;