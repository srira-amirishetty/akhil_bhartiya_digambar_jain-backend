const mongoose = require('mongoose');

const jainLiteratureSchema = new mongoose.Schema({
  literatureType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('JainLiterature', jainLiteratureSchema);
