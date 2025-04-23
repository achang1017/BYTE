const { google } = require('googleapis');
const extractFlightInfo = require('../utils/extractFlightInfo');

exports.getFlightEmails = async (accessToken) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for emails with 'flight' or 'itinerary' in the subject
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

      const parts = msgData.data.payload.parts || [];
      const htmlPart = parts.find(p => p.mimeType === 'text/html');
      const bodyData = htmlPart?.body?.data;

      if (!bodyData) continue;

      const html = Buffer.from(bodyData, 'base64').toString('utf-8');
      const flight = extractFlightInfo(html);

      if (flight) {
        console.log('Parsed flight:', flight); // ✅ Log what's being returned
        parsedFlights.push(flight);
      }
    }

    // ✅ Return most recent flights first
    return parsedFlights.reverse();
  } catch (error) {
    console.error('Gmail API error:', error);
    throw error;
  }
};
