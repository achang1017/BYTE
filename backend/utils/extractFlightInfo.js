const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

module.exports = function extractFlightInfo(body) {
  // Removed duplicate declaration of flightRegex
  const gateRegex = /Gate[:\s]*([A-Z\d]+)/i;
  const dateRegex = /\b\d{4}-\d{2}-\d{2}\b/;
  const departureRegex = /Departure[:\s]*([A-Z]{3})\s+at\s+(\d{1,2}:\d{2}\s*[APMapm]+)/i;
  const arrivalRegex = /Arrival[:\s]*([A-Z]{3})\s+at\s+(\d{1,2}:\d{2}\s*[APMapm]+)/i;

  const matchFlight = body.match(flightRegex);
  const matchGate = body.match(gateRegex);
  const matchDate = body.match(dateRegex);
  const matchDeparture = body.match(departureRegex);
  const matchArrival = body.match(arrivalRegex);

  const flightNumber = matchFlight?.[1] || 'Unknown';
  const gate = matchGate?.[1] || 'Unknown';
  const date = matchDate?.[0] || 'Unknown';
  const departure = matchDeparture?.[1] || 'Unknown';
  const arrival = matchArrival?.[1] || 'Unknown';
  const departureTime = matchDeparture?.[2] || 'Unknown';
  const arrivalTime = matchArrival?.[2] || 'Unknown';

  let duration = 'Unknown';
  let status = 'Unknown';

  try {
    if (date && rawDepartureTime && rawArrivalTime) {
      departureTime = dayjs(`${date} ${rawDepartureTime}`, 'YYYY-MM-DD h:mm A').toISOString();
      arrivalTime = dayjs(`${date} ${rawArrivalTime}`, 'YYYY-MM-DD h:mm A').toISOString();

      const dep = dayjs(departureTime);
      const arr = dayjs(arrivalTime);

      const mins = arr.diff(dep, 'minute');
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      duration = `${hours}h ${minutes}m`;

      // If duration exceeds 3 hours, flag as delayed (example logic)
      if (mins > 30) status = 'Delayed';
    }
  } catch (err) {
    console.error('Error parsing date/time:', err.message);
  }

  return {
    flightNumber,
    gate,
    date,
    departureTime,
    arrivalTime,
    departure,
    arrival,
    status,
    duration,
  };
};
