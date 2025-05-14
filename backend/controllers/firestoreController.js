const { db } = require('../firebase/firebaseInit');

const getCollection = async (req, res) => {
  try {
    const collectionName = req.params.name;
    if (!collectionName || typeof collectionName !== 'string') {
      console.error('[firestoreController] Invalid or missing collection name:', collectionName);
      return res.status(400).json({ error: 'Invalid or missing collection name.' });
    }
    console.log(`[firestoreController] Fetching collection: ${collectionName}`);
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`[firestoreController] Fetched ${data.length} documents from ${collectionName}`);
    res.status(200).json(data);
  } catch (error) {
    console.error('[firestoreController] Error fetching collection:', error);
    res.status(500).json({ error: error.message });
  }
};


const getSubcollection = async (req, res) => {
  try {
    const { collectionName, docId, subcollectionName } = req.params;
    if (!collectionName || !docId || !subcollectionName) {
      console.error('[firestoreController] Missing required params:', req.params);
      return res.status(400).json({ error: 'Missing required parameters.' });
    }
    console.log(`[firestoreController] Fetching subcollection: ${collectionName}/${docId}/${subcollectionName}`);
    const snapshot = await db.collection(collectionName).doc(docId).collection(subcollectionName).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(`[firestoreController] Fetched ${data.length} documents from ${collectionName}/${docId}/${subcollectionName}`);
    res.status(200).json(data);
  } catch (error) {
    console.error('[firestoreController] Error fetching subcollection:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCollection, getSubcollection };