const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  panNumber: String,
  aadharNumber: String,
  addressLine1: String,
  addressLine2: String,
  country: String,
  state: String,
  city: String,
  zip: String,
  donationType: String,
  donationAmount: Number,
  sansta:String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);