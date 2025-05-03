const express = require('express');
const gmailRouter = require('./routes/gmailRoutes');
const userRouter = require('./routes/userRoutes');
const alternativeFlightsRouter = require('./routes/alternativeFlightsRoutes');

const router = express.Router();

router.use("/gmail", gmailRouter);
router.use("/user", userRouter);
router.use("/alternativeFlights", alternativeFlightsRouter);

module.exports = router;

