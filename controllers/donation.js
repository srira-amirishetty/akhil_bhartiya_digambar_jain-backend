const Donation = require('../models/donation');

const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: 'Donation saved successfully', donation });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save donation' });
  }
};

module.exports = {
  createDonation,
};