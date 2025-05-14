const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

const FLIGHT_API_KEY = process.env.FLIGHT_API_KEY;

router.get('/', async (req, res) => {
  const { flightNumber, departure, departureTime } = req.query;

  if (!flightNumber || !departure || !departureTime) {
      return res.status(400).json({ error: 'Missing flight info query' });
  }

  try {
    const formattedDepartureTime = new Date(departureTime).toISOString().slice(0, 19) + ".000";
    const scheduleResponse = await fetch(
      `https://aviation-edge.com/v2/public/timetable?key=${FLIGHT_API_KEY}&iataCode=${departure}&flight_iata=${flightNumber}&type=departure&dep_schTime=${formattedDepartureTime}`
    );
    
    if (!scheduleResponse.ok) throw new Error('Failed to fetch real time flight schedule');
    const scheduleData = await scheduleResponse.json();
    const flight = scheduleData[0];
    if (!flight) return res.status(200).json({ status: 'not found' });

    return res.json(flight);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
