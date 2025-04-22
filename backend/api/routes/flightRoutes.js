const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const router = express.Router();

// we don't use this now but can use later to get flight data from db
router.get("/:flightNumber", async (req, res) => {
    try {
        const flightNumber = req.params.flightNumber;
        
        if (!flightNumber) {
            return res.status(400).json({
                status: "error",
                error: "Flight Number is required.",
            });
        }

        const docRef = db.collection("flights").doc(flightNumber);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ status: "error", error: "Flight not found." });
        }

        const flightData = doc.data();
        return res.json(flightData);

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});


module.exports = router;