const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const gmailRoutes = require('./routes/gmailRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', gmailRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
