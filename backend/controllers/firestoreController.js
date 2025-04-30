const { db } = require('../firebase/firebaseInit');

/**
 * Secure and flexible Firestore collection fetcher.
 * Automatically filters by userId if present in request.
 * Automatically sorts by departureTime if the collection is 'flights'.
 */
exports.getCollection = async (req, res) => {
  try {
    const collectionName = req.params.name;
    const userId = req.user?.uid; // Assumes authentication middleware added user ID to req.user

    let query = db.collection(collectionName);

    // Add userId filter if available
    if (userId) {
      query = query.where('userId', '==', userId);
    }

    // Add departureTime ordering if collection is 'flights'
    if (collectionName === 'flights') {
      query = query.orderBy('departureTime');
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return res.status(200).json({ [collectionName]: data });
  } catch (error) {
    console.error(`Error fetching ${req.params.name} from Firestore:`, error);
    return res.status(500).json({ error: 'Unable to fetch collection data' });
  }
};
