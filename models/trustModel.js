const mongoose = require("mongoose");

const KaryakartaSchema = new mongoose.Schema({
  name: String,
  role: String,
  imageUrl: String,
});

const TrustSchema = new mongoose.Schema({
  title: String,
  description: String,
  karyakartas: [KaryakartaSchema],
});

module.exports = mongoose.model("Trust", TrustSchema);
