const Gallery = require('../models/Gallery');

exports.createGallery = async (req, res) => {
  try {
    const { type, title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newGallery = new Gallery({ type, title, description, image });
    await newGallery.save();

    res.status(201).json(newGallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGallery = async (req, res) => {
  const galleries = await Gallery.find().sort({ date: -1 });
  res.json(galleries);
};

exports.getGalleryById = async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);
  if (!gallery) return res.status(404).json({ message: 'Not found' });
  res.json(gallery);
};

exports.updateGallery = async (req, res) => {
  const updates = { ...req.body };
  if (req.file) updates.image = req.file.filename;

  const updated = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json(updated);
};

exports.deleteGallery = async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
