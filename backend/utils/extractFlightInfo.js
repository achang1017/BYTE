function extractFlightInfo(emailData) {
  const payload = emailData.payload;
  const body = payload.body.data
    ? Buffer.from(payload.body.data, 'base64').toString('utf-8')
    : '';

  const flightRegex = /Flight\s(\w+)\sfrom\s(\w+)\sto\s(\w+)\son\s([\d-]+)\sat\s([\d:APM]+)/i;
  const match = body.match(flightRegex);

  if (match) {
    return {
      flightNumber: match[1],
      departure: match[2],
      arrival: match[3],
      date: match[4],
      time: match[5],
    };
  }

  return null;
}

module.exports = extractFlightInfo;