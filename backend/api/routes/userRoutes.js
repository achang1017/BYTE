const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ status: "error", message: "Email is required" });
        }

        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();

        if (!doc.exists) {
            await userRef.set({
                email,
                firstName: "test1",
                lastName: "test2",
            });
        }

        res.status(201).json({ status: "success", message: "User created" });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

module.exports = router;