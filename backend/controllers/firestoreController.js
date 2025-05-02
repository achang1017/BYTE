const { db } = require('../firebase/firebaseInit');

const getCollection = async (req, res) => {
  try {
    const collectionName = req.params.name;
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCollection };