const express = require('express');
const gmailRouter = require('./routes/gmailRoutes');
const userRouter = require('./routes/userRoutes');

const router = express.Router();

router.use("/gmail", gmailRouter);
router.use("/user", userRouter);


module.exports = router;

