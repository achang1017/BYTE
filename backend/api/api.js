const express = require('express');
const gmailRouter = require('./routes/gmailRoutes');
const userRouter = require('./routes/userRoutes');
const alternativeFlightsRouter = require('./routes/alternativeFlightsRoutes');
const flightInterruptionRouter = require('./routes/flightInterruptionRoutes');

const router = express.Router();

router.use("/gmail", gmailRouter);
router.use("/user", userRouter);
router.use("/alternativeFlights", alternativeFlightsRouter);
router.use("/flightInterruption", flightInterruptionRouter);


module.exports = router;

