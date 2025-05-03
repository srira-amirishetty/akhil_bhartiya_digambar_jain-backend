const express = require("express");
const app = express()
const db = require('./db')

db()

app.use(express.json());
const ShayatahealthRoute = require('./routes/Shayatahealth')

app.use('/api',ShayatahealthRoute);
// app.use('/api',ShayataApplicationRoute)



app.listen(3000, () => {
    console.log("running")
})