const admin = require('firebase-admin');
const serviceAccount = require('./byte-84b98-firebase-adminsdk-fbsvc-b1d6050e5c.json');


const serviceAccount = {
  project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { admin, db };