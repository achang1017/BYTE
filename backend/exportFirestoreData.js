const admin = require('firebase-admin');
const serviceAccount = require('./firebase/byte-84b98-firebase-adminsdk-fbsvc-b1d6050e5c.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportFirestoreData() {
  const usersSnapshot = await db.collection('users').get();
  const data = {};
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id;
    const userData = userDoc.data();
    // Fetch all trips for this user
    const tripsSnapshot = await db.collection('users').doc(userId).collection('trips').get();
    const trips = {};
    tripsSnapshot.forEach(tripDoc => {
      trips[tripDoc.id] = tripDoc.data();
    });
    data[userId] = {
      ...userData,
      trips,
    };
  }
  console.log(JSON.stringify(data, null, 2));
}

exportFirestoreData();
