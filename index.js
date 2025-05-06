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
const memberRoutes = require('./routes/memberRoutes')
const ShayatahealthRoute = require('./routes/Shayatahealth');
const updatememberRoutes = require('./routes/memberUpdateRoutes')


app.use('/api', ShayatahealthRoute);
app.use('/api',memberRoutes)
app.use('/api',updatememberRoutes)

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
