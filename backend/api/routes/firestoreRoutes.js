const express = require('express');
const { getCollection } = require('../../controllers/firestoreController');

const router = express.Router();

router.get('/collection/:name', getCollection);

module.exports = router;