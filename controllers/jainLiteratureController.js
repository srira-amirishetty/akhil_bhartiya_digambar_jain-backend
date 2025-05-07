const JainLiterature = require('../models/JainLiterature');

exports.addLiterature = async (req, res) => {
  try {
    const { literatureType, title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const literature = await JainLiterature.create({
      literatureType,
      title,
      description,
      image,
    });

    res.status(201).json({ success: true, data: literature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllLiterature = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const total = await JainLiterature.countDocuments();
    const literature = await JainLiterature.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: literature,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLiteratureById = async (req, res) => {
  try {
    const literature = await JainLiterature.findById(req.params.id);
    if (!literature) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true, data: literature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLiterature = async (req, res) => {
  try {
    const { literatureType, title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedData = { literatureType, title, description };
    if (image) updatedData.image = image;

    const literature = await JainLiterature.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.json({ success: true, data: literature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLiterature = async (req, res) => {
  try {
    await JainLiterature.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
