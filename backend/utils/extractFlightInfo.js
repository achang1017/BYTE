module.exports = function extractFlightInfo(body) {
  const flightRegex = /Flight[:\s]*([A-Z]+\d+)/i;
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
  let status = 'On Time';

  try {
    const parseTime = (t) =>
      new Date(`${date} ${t}`).getTime();

    const depTime = parseTime(departureTime);
    const arrTime = parseTime(arrivalTime);

    if (!isNaN(depTime) && !isNaN(arrTime)) {
      const mins = Math.round((arrTime - depTime) / 60000);
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      duration = `${hours}h ${minutes}m`;

      if (mins > 180) status = 'Delayed'; // simple example logic
    }
  } catch (err) {
    console.error('Error calculating duration/status:', err.message);
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
