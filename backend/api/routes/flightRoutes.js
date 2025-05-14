const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const { flightInfo } = req.body;
  
      if (!flightInfo) {
        return res.status(400).json({ status: "error", message: "Flight info is required" });
      }
  
      const flightRef = db.collection("flights").doc(flightInfo.flightNumber);
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