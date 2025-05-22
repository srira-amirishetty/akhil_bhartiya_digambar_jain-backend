const JainMandir = require('../models/JainMandir');
const fs = require('fs');

exports.createMandir = async (req, res) => {
  try {
    const { name, address, description } = req.body;
    const imageUrl = req.file ? req.file.path : '';
    const mandir = new JainMandir({ name, address, description, imageUrl });
    await mandir.save();
    res.status(201).json(mandir);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMandirs = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search ? { name: new RegExp(search, 'i') } : {};
    const mandirs = await JainMandir.find(query);
    res.json(mandirs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMandirById = async (req, res) => {
  try {
    const mandir = await JainMandir.findById(req.params.id);
    if (!mandir) return res.status(404).json({ error: 'Mandir not found' });
    res.json(mandir);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMandir = async (req, res) => {
  try {
    const { name, address, description } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;

    const mandir = await JainMandir.findByIdAndUpdate(req.params.id, {
      ...(name && { name }),
      ...(address && { address }),
      ...(description && { description }),
      ...(imageUrl && { imageUrl })
    }, { new: true });

    if (!mandir) return res.status(404).json({ error: 'Mandir not found' });
    res.json(mandir);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMandir = async (req, res) => {
  try {
    const mandir = await JainMandir.findByIdAndDelete(req.params.id);
    if (!mandir) return res.status(404).json({ error: 'Mandir not found' });
    if (mandir.imageUrl) fs.unlinkSync(mandir.imageUrl);
    res.json({ message: 'Mandir deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
