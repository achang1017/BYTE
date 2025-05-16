const express = require('express');
const { db } = require('../../firebase/firebaseInit');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, name } = req.body;


        if (!email || !name) {
            return res.status(400).json({ status: "error", message: "User info is required" });
        }

        const userRef = db.collection('users').doc(email);
        const doc = await userRef.get();


        if (!doc.exists) {
            await userRef.set({
                name: name,
                email: email,
            }, {
                merge: true
            });
        }

        res.status(201).json({ status: "success", message: "User created" });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

module.exports = router;