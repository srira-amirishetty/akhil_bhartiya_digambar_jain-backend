const express = require("express");
const app = express()
const db = require('./db')
require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());

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

app.use('/api',ShayatahealthRoute);
app.use('/api',ShayataeducationRoutes)
app.use('/api',ShayataMemberRoute);
app.use('/api/',ShayataFinanceRoute)
app.use('/api/',ShayataBanDetailsRoute)
app.use('/api/',donationRoute);
app.use('/api/',memberRoute)
app.use('/api/',memberUpdateRoute);



// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});