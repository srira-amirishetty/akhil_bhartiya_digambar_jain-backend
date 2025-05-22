const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['Image & Video', 'Article'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, 
});

module.exports = mongoose.model('Gallery', gallerySchema);
