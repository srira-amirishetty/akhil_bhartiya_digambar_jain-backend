const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  relation: String,
  age: Number,
  occupation: String,
  membersReferred: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShayataApplication' }],
});

module.exports = mongoose.model('User', userSchema);


const ShayataApplicationSchema = new mongoose.Schema({
  // Step tracking
  step: { type: Number, default: 1 },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Applicant Details
  applicantName: String,
  applicantImage: {
    data:Buffer,
    contentType:String
    }, 

    address:String,
    country:String,
    city: String,
    state: String,
    pinCode: String,
    mobileNumber:String,
  

  // Beneficiary Details
  BeneficiaryUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  beneficiaryName: String,
  beneficiaryImage: {
    data:Buffer,
    contentType:String
    },
  beneficiaryAge: Number,
  beneficiaryBirthDate: Date,
  isTrustMember:boolean,
  membershipNo:Number,
  beneficiaryCountry:String,
  beneficiaryState:String,
  beneficiaryCity:String,
  beneficiaryPincode:String,
  beneficiaryMobileNumber:Number,


  // Family Income
  relationWithBeneficiary:String,
  totalIncome: Number,
  applicantsOccupation: Number,

  // details of medical help by any member
  MedicalHelp: [
    {
      year: Number,
      fullName: String,
      typeOfHelp: String,
      amount:String
    }
  ],

  // help from government
  governmentHelp:[ {
    nameofTrust: String,
    typeofHelp: String,
    amount:Number
  }],

//   status: {
//     type: String,
//     enum: ['Draft', 'Submitted'],
//     default: 'Draft'
//   }
}, { timestamps: true });

module.exports = mongoose.model('ShayataApplication', ShayataApplicationSchema);
