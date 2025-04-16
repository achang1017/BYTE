const admin = require('firebase-admin');

const serviceAccount = {
  project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
