const mongoose = require('mongoose');

const businessInfoSchema = new mongoose.Schema({
  personalId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo', required: true },

  employmentType: {
    type: String,
    enum: ['Student', 'Housewife', 'Business', 'Service'],
    required: true
  },
  natureOfBusiness: {
    type: String,
    enum: [
      'Teaching', 'Trading', 'Insurance Agent', 'Chartered Accountant',
      'Doctor', 'Architect', 'Construction', 'Software Developer',
      'Agriculture', 'Agency Business', 'Consultant', 'Property Broker', 'Others'
    ],
    required: true
  },
  businessName: { type: String },
  productDetails: { type: String },
  businessAddress: { type: String },
  businessTown: { type: String },
  businessPinCode: { type: String },
  businessState: { type: String },
  businessCountry: { type: String },
  officeTelephoneNo: { type: String },
  businessWhatsAppNo: { type: String },
  businessEmailId: { type: String },
  businessSocialMedia: { type: String },
  personalWhatsAppNo: { type: String },
  personalEmailId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('BusinessInfo', businessInfoSchema);
