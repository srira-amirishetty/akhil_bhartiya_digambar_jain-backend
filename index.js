const express = require("express");
const app = express()
const db = require('./db')

db()

app.use(express.json());
const healthRoute = require('./routes/health')

app.use('/',healthRoute);


// app.post('/health',(req,res) => {
//     const data = req.body
//     console.log(data)
//     res.send(data)
// })

app.listen(3000, () => {
    console.log("running")
})