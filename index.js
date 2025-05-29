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
const sanstaRoute = require('./routes/sansta')
const shakshaRoute = require('./routes/shaksha')
const newsupdate = require('./routes/newsupdate')
const memberevent = require('./routes/memberevent')
const samajevent = require('./routes/samajevent')


app.use('/api',ShayatahealthRoute);
app.use('/api',ShayataeducationRoutes)
app.use('/api',ShayataMemberRoute);
app.use('/api/',ShayataFinanceRoute);
app.use('/api/',ShayataBanDetailsRoute);
app.use('/api/',donationRoute);
app.use('/api/',memberRoute);
app.use('/api/',memberUpdateRoute);
app.use('/api/',sanstaRoute);
app.use('/api/',shakshaRoute);
app.use('/api/',newsupdate);
app.use('/api/',memberevent);
app.use('/api/',samajevent);


// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});