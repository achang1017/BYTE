const express = require('express');
const gmailRouter = require('./routes/gmailRoutes');
const userRouter = require('./routes/userRoutes');
<<<<<<< HEAD
const alternativeFlightsRouter = require('./routes/alternativeFlightsRoutes');
=======
const flightInterruptionRouter = require('./routes/flightInterruptionRoutes');
>>>>>>> realtime-flight

const router = express.Router();

router.use("/gmail", gmailRouter);
router.use("/user", userRouter);
<<<<<<< HEAD
router.use("/alternativeFlights", alternativeFlightsRouter);
=======
router.use("/flightInterruption", flightInterruptionRouter);

>>>>>>> realtime-flight

module.exports = router;

