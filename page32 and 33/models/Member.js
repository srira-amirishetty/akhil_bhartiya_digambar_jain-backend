const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  city: String,
  birthDate: Date,
  profilePic: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);