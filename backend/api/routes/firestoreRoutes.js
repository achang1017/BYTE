const express = require('express');
const { getCollection, getUpcomingFlights } = require('../../controllers/firestoreController');

const router = express.Router();

router.get('/collection/:name', getCollection);

router.get('/upcoming-flights/:userId', getUpcomingFlights);

module.exports = router;