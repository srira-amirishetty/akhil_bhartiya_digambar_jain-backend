// const mongoose = require('mongoose');
// require("dotenv").config()

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error)
//         process.exit(1)
//     }
// }

// module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
