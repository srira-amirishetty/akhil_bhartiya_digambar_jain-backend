const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
 applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShayataApplication' },
  accountHolderName: String,
  bankName: String,
  branchName: String,
  ifscCode: String,
  accountNumber: String,
  img:  String
  ,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bank', BankSchema);