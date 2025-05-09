const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  accountHolderName: String,
  bankName: String,
  branchName: String,
  ifscCode: String,
  accountNumber: String,
  img: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bank', BankSchema);