const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  qualification: String,
  aadhaar: String,
  pan: String,
  mediclaimPolicy: String,
  termInsurance: String,
  lifeInsurance: String,
  socialPost: String,
  image: {
    data: Buffer,
    contentType: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
