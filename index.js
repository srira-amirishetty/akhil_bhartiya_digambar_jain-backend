require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI); // 🔍 Debug line
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');

db(); // already handles mongoose.connect
app.use(cors());
app.use(express.json());

// Routes
const ShayatahealthRoute = require('./routes/Shayatahealth');
app.use('/api', ShayatahealthRoute);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
