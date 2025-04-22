const express = require('express');
const gmailRouter = require('./routes/gmailRoutes');

const router = express.Router();

router.use("/gmail", gmailRouter);


module.exports = router;

