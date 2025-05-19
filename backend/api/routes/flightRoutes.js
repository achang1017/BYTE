const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('flights').orderBy('departureTime').get();
        const flights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});


module.exports = router;