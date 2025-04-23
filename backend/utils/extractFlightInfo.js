const flightRegex = /Flight[:\s]*([A-Z]+\d+)/i;
const gateRegex = /Gate[:\s]*([A-Z\d]+)/i;
const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b/;
const departureRegex = /Departure[:\s]*([A-Z]{3})\s+at\s+(\d{1,2}:\d{2}\s*[APMapm]+)/i;
const arrivalRegex = /Arrival[:\s]*([A-Z]{3})\s+at\s+(\d{1,2}:\d{2}\s*[APMapm]+)/i;

function convertToISO(dateStr, timeStr) {
  try {
    return new Date(`${dateStr} ${timeStr}`).toISOString();
  } catch {
    return null;
  }
}

module.exports = function extractFlightInfo(body) {
  const matchFlight = body.match(flightRegex);
  const matchGate = body.match(gateRegex);
  const matchDate = body.match(dateRegex);
  const matchDeparture = body.match(departureRegex);
  const matchArrival = body.match(arrivalRegex);

  const date = matchDate?.[1] || null;
  const departureTime = convertToISO(date, matchDeparture?.[2]) || 'Unknown';
  const arrivalTime = convertToISO(date, matchArrival?.[2]) || 'Unknown';

  return {
    flightNumber: matchFlight?.[1] || 'Unknown',
    gate: matchGate?.[1] || 'Unknown',
    date: date || 'Unknown',
    departure: matchDeparture?.[1] || 'Unknown',
    arrival: matchArrival?.[1] || 'Unknown',
    departureTime,
    arrivalTime,
    status: 'Unknown',
  };
};
