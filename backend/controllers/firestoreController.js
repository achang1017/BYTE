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
    const data = snapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
        departureTime: new Date(docData.departureTime).toISOString(),
        arrivalTime: new Date(docData.arrivalTime).toISOString(),
      };
    });

    return res.status(200).json({ [collectionName]: data });
  } catch (error) {
    console.error(`Error fetching ${req.params.name} from Firestore:`, error);
    return res.status(500).json({ error: 'Unable to fetch collection data' });
  }
};

exports.addFlightData = async (req, res) => {
  try {
    const { departureTime, arrivalTime, ...otherData } = req.body;

    // Validate and convert times to ISO 8601 format
    const flightData = {
      ...otherData,
      departureTime: new Date(departureTime).toISOString(),
      arrivalTime: new Date(arrivalTime).toISOString(),
    };

    // Add flight data to Firestore
    const docRef = await db.collection('flights').add(flightData);

    return res.status(201).json({ message: 'Flight data added successfully', id: docRef.id });
  } catch (error) {
    console.error('Error adding flight data:', error);
    return res.status(500).json({ error: 'Unable to add flight data' });
  }
};
