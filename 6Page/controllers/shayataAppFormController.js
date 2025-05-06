const Application = require('../models/Form');

exports.submitForm = async (req, res) => {
  try {
    const { accountHolderName, bankName, branchName, ifscCode, accountNumber } = req.body;

    // Validate required fields
    if (!accountHolderName || !bankName || !branchName || !ifscCode || !accountNumber) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate uploaded files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one image is required.' });
    }

    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype
    }));

    const newApplication = new Application({
      accountHolderName,
      bankName,
      branchName,
      ifscCode,
      accountNumber,
      images
    });

    await newApplication.save();
    res.status(201).json({ message: 'Form submitted successfully', data: newApplication });
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};
