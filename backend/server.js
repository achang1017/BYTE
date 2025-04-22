const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const allRoutes = require('./api/api');

app.use(cors());
app.use(express.json());
app.use('/api', allRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
