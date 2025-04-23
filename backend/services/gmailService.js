const { google } = require('googleapis');
const extractFlightInfo = require('../utils/extractFlightInfo');


exports.getFlightEmails = async (accessToken) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'subject:(flight OR itinerary)',
    maxResults: 10,
  });

  const messages = res.data.messages || [];
  const parsedFlights = [];

  for (const msg of messages) {
    const msgData = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
      format: 'full',
    });

    let bodyData = '';

    const payload = msgData.data.payload;
    const parts = payload.parts || [];

    const htmlPart = parts.find(p => p.mimeType === 'text/html');
    const plainPart = parts.find(p => p.mimeType === 'text/plain');

    if (htmlPart?.body?.data) {
      bodyData = Buffer.from(htmlPart.body.data, 'base64').toString('utf-8');
    } else if (plainPart?.body?.data) {
      bodyData = Buffer.from(plainPart.body.data, 'base64').toString('utf-8');
    } else if (payload.body?.data) {
      bodyData = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }

    if (bodyData) {
      const flightInfo = extractFlightInfo(bodyData);
      parsedFlights.push(flightInfo);
    }
  }

  return parsedFlights;
};
