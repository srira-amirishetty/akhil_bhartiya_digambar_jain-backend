const mongoose = require('mongoose');

const JainMandirSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  imageUrl: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('JainMandir', JainMandirSchema);
