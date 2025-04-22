const { google } = require('googleapis');
const extractFlightInfo = require('../utils/extractFlightInfo');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth2callback' // Adjust redirect URI if needed
);

async function getFlightEmails(userToken) {
  oauth2Client.setCredentials({ access_token: userToken });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'subject:flight OR itinerary',
  });

  const messages = res.data.messages || [];
  const flightDetails = [];

  for (const message of messages) {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
    });

    const flightInfo = extractFlightInfo(msg.data);
    if (flightInfo) flightDetails.push(flightInfo);
  }

  return flightDetails;
}

module.exports = { getFlightEmails };