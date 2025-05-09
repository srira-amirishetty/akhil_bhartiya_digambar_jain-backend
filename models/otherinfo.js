const mongoose = require('mongoose');

const otherInfoSchema = new mongoose.Schema({
  educationalQualification: { type: String },
  aadharNo: { type: String },
  panNo: { type: String },
  currentlyActiveInsurancePolicy: { type: String },
  termInsurance: { type: String },
  lifeInsurance: { type: String },
  mediclaim: { type: String },
  postHeldInSamajOrOtherOrg: { type: String }
});

module.exports = mongoose.model('OtherInfo', otherInfoSchema);