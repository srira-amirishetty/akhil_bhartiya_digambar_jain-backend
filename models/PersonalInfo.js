const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  surname: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  maritalStatus: { type: String, enum: ['Married', 'Unmarried'], required: true },
  dateOfBirth: { type: Date },
  age: { type: Number },
  marriageAnniversaryDate: { type: Date },
  residentialAddress: { type: String },
  town: { type: String },
  pinCode: { type: String },
  state: { type: String },
  country: { type: String },
  mobileNo: { type: String },
  whatsappMobileNo: { type: String },
  email: { type: String },
  uploadImage: { type: String },
  uploadByCamera: { type: String },
  socialMediaContact: { type: String },
  whatsappMobileLink: { type: String },
  emailLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
