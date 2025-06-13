const Trust = require("../models/trustModel");
const express = require('express');
const router = express.Router();
const trustController = require('../Controller/trustController');

// Get Trust Info
exports.getTrust = async (req, res) => {
  try {
    const trust = await Trust.findOne();
    res.json(trust);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Trust Info
exports.updateTrust = async (req, res) => {
  try {
    const updated = await Trust.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Karyakarta
exports.addKaryakarta = async (req, res) => {
  try {
    const trust = await Trust.findOne();
    trust.karyakartas.push(req.body);
    await trust.save();
    res.json(trust.karyakartas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Karyakarta
exports.editKaryakarta = async (req, res) => {
  try {
    const trust = await Trust.findOne();
    const karyakarta = trust.karyakartas.id(req.params.id);
    Object.assign(karyakarta, req.body);
    await trust.save();
    res.json(karyakarta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Karyakarta
exports.deleteKaryakarta = async (req, res) => {
  try {
    const trust = await Trust.findOne();
    trust.karyakartas.id(req.params.id).remove();
    await trust.save();
    res.json({ message: "Karyakarta deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.get('/trust', trustController.getTrust);
