const admin = require('firebase-admin');

async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Unauthorized: No Firebase ID token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    // verifyIdToken will throw if the token is invalid or expired
    const decoded = await admin.auth().verifyIdToken(idToken);
    // attach the UID (and any other claims) to req.user
    req.user = { uid: decoded.uid, email: decoded.email };
    return next();
  } catch (err) {
    console.error('Firebase token verification failed:', err);
    return res
      .status(401)
      .json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

module.exports = { verifyFirebaseToken };
