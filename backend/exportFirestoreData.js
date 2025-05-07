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

    // Get the specific 'trip123' document from the 'trips' subcollection
    const trip123Doc = await userDoc.ref.collection('trips').doc('trip123').get();
    const trip123Data = trip123Doc.exists ? trip123Doc.data() : null; // Get data if the document exists

    // Include user data and trip123 data (if it exists)
    data[userId] = {
      ...userData,
      trip123: trip123Data, // Add the trip123 data here (will be null if the document doesn't exist)
    };
  }
  console.log(JSON.stringify(data, null, 2));
}

exportFirestoreData();
