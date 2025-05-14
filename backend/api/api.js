const express = require('express');
const gmailRouter = require('./routes/gmailRoutes');
const userRouter = require('./routes/userRoutes');
const alternativeFlightsRouter = require('./routes/alternativeFlightsRoutes');
const flightInterruptionRouter = require('./routes/flightInterruptionRoutes');
const flightRouter = require('./routes/flightRoutes');

const router = express.Router();

router.use("/gmail", gmailRouter);
router.use("/user", userRouter);
router.use("/alternativeFlights", alternativeFlightsRouter);
router.use("/flightInterruption", flightInterruptionRouter);
router.use("/updateFlight", flightRouter);


module.exports = router;

