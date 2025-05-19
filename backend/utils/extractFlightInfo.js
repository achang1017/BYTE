const flightRegex = /Flight[:\s]*([A-Z]+\d+)/i;
const gateRegex = /Gate[:\s]*([A-Z\d]+)/i;
const dateRegex = /\b(\d{4}-\d{2}-\d{2})\b/;
const departureRegex = /Departure:\s*([A-Z]{3})\s+at\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}[+-]\d{2}:\d{2})/i;
const arrivalRegex = /Arrival:\s*([A-Z]{3})\s+at\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}[+-]\d{2}:\d{2})/i;


// example email input:
// Flight: AS34
// Gate: D2
// Date: 2025-05-19
// Departure: SEA at 2025-05-19T10:55-07:00
// Arrival: JFK at 2025-05-19T19:29-04:00

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

  return {
    flightNumber: matchFlight?.[1] || 'Unknown',
    gate: matchGate?.[1] || 'Unknown',
    date: matchDate?.[1] || 'Unknown',
    departure: matchDeparture?.[1] || 'Unknown',
    arrival: matchArrival?.[1] || 'Unknown',
    departureTime: matchDeparture?.[2] || 'Unknown',
    arrivalTime: matchArrival?.[2] || 'Unknown',
    status: 'Unknown',
  };
};


