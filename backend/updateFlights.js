// updateFlights.js
// Run this script with: node updateFlights.js

const admin = require('firebase-admin');
const serviceAccount = require('./firebase/byte-84b98-firebase-adminsdk-fbsvc-b1d6050e5c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function updateFlights() {
  const flights = [
    {
      id: 'UA457',
      data: {
        date: '2025-05-13',
        flightNumber: 'UA457',
        gate: 'A12',
        departure: 'SEA',
        arrival: 'LAX',
        departureTime: '2025-05-13T08:00:00-07:00',
        arrivalTime: '2025-05-13T10:30:00-07:00',
        duration: '2h 30m',
        status: 'Scheduled',
      },
    },
    {
      id: 'BA123',
      data: {
        date: '2025-05-17',
        flightNumber: 'BA123',
        gate: 'B7',
        departure: 'LAX',
        arrival: 'SEA',
        departureTime: '2025-05-17T15:00:00-07:00',
        arrivalTime: '2025-05-17T17:30:00-07:00',
        duration: '2h 30m',
        status: 'Scheduled',
      },
    },
  ];

  for (const flight of flights) {
    await db.collection('flights').doc(flight.id).set(flight.data, { merge: true });
    console.log(`Updated/created flight: ${flight.id}`);
  }
  console.log('Done updating flights.');
  process.exit(0);
}

updateFlights().catch((err) => {
  console.error('Error updating flights:', err);
  process.exit(1);
});
