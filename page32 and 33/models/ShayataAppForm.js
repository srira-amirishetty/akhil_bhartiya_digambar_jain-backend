const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  accountHolderName: String,
  bankName: String,
  branchName: String,
  ifscCode: String,
  accountNumber: String,
  uploadImage: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', FormSchema);
