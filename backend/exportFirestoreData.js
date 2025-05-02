const admin = require('firebase-admin');
const serviceAccount = require('./firebase/byte-84b98-firebase-adminsdk-fbsvc-b1d6050e5c.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function exportFirestoreData() {
  const snapshot = await db.collection('users').get();
  const data = {};
  snapshot.forEach((doc) => {
    data[doc.id] = doc.data();
  });
  console.log(JSON.stringify(data, null, 2));
}

exportFirestoreData();
