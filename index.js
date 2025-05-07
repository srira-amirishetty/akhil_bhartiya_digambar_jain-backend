require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
db(); // Connect MongoDB

app.use(cors());
app.use(express.json());

// Routes
const memberRoutes = require('./routes/memberRoutes')
const ShayatahealthRoute = require('./routes/Shayatahealth');
const updatememberRoutes = require('./routes/memberUpdateRoutes')
const jainLiteratureRoutes = require('./routes/jainLiteratureRoutes');


app.use('/api', ShayatahealthRoute);
app.use('/api',memberRoutes)
app.use('/api',updatememberRoutes)
app.use('/api/jain-literature', jainLiteratureRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
