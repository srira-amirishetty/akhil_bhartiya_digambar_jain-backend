const express = require("express");
const app = express()
const db = require('./config/db')
require('dotenv').config();

const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());

const connectDB = require('./config/db');
connectDB();

// database connection
db()

app.use(express.json());

const ShayatahealthRoute = require('./routes/Shayatahealth')
const ShayataeducationRoutes = require('./routes/Shayataeducation')
const ShayataMemberRoute = require('./routes/ShayataMember')
const ShayataFinanceRoute = require('./routes/Shayatafinance')
const ShayataBanDetailsRoute = require('./routes/ShayataBankDetails')
const donationRoute = require('./routes/donation')
const memberRoute = require('./routes/member')
const memberUpdateRoute = require('./routes/memberUpdate')
<<<<<<< HEAD
const sanstaRoute = require('./routes/sansta')
const shakshaRoute = require('./routes/shaksha')
=======
const sanstaRoutes = require('./routes/sansta');
>>>>>>> e220276ec7573435dca51b55cf9b8128ae3470f8

app.use('/api',ShayatahealthRoute);
app.use('/api',ShayataeducationRoutes)
app.use('/api',ShayataMemberRoute);
app.use('/api/',ShayataFinanceRoute)
app.use('/api/',ShayataBanDetailsRoute)
app.use('/api/',donationRoute);
app.use('/api/',memberRoute)
app.use('/api/',memberUpdateRoute);
<<<<<<< HEAD
app.use('/api/',sanstaRoute)
app.use('/api/',shakshaRoute);
=======
app.use('/api/',sanstaRoutes)

>>>>>>> e220276ec7573435dca51b55cf9b8128ae3470f8


// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});