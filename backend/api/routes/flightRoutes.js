const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const router = express.Router();

router.get('/:flightNumber', async (req, res) => {
    try {
        const { flightNumber } = req.params;
        const flightRef = db.collection('flights').doc(flightNumber);
        const docSnap = await flightRef.get();
        if (!docSnap.exists) {
            return res.status(404).json({ status: 'error', message: 'Flight not found' });
        }
        res.status(200).json({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
      const { flightNumber, flightInfo } = req.body;
  
      if (!flightNumber || !flightInfo) {
        return res.status(400).json({ status: "error", message: "Flight number and info are required" });
      }
  
      const flightRef = db.collection("flights").doc(flightNumber);
      await flightRef.set(flightInfo, { merge: true });
  
      res.status(200).json({ status: "success", message: "Flight info updated" });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
});

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