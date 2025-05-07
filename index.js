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
// const addMemberRoutes = require('./routes/addMemberRoutes')
const ShayataeducationRoutes = require('./routes/education')
// const ShayataAppformRoute = require('./routes/shayataAppForm')
const ShayataMemberRoute = require('./routes/ShayataMember')
const authorizedUser = require('./routes/authorizedUser')

app.use('/api',ShayatahealthRoute);
app.use('/api',ShayataeducationRoutes)
// app.use('/api',ShayataAppformRoute);
app.use('/api',ShayataMemberRoute);
app.use('/api',authorizedUser);

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});