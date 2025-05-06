const express = require('express');
const router = express.Router();
const Form = require('../models/ShayataAppForm');

// @route POST /api/form/submit
router.post('/submit', async (req, res) => {
  try {
    const {
      accountHolderName,
      bankName,
      branchName,
      ifscCode,
      accountNumber,
      imageData,
      contentType
    } = req.body;

    const imageBuffer = Buffer.from(imageData, 'base64');

    const form = new Form({
      accountHolderName,
      bankName,
      branchName,
      ifscCode,
      accountNumber,
      uploadImage: {
        data: imageBuffer,
        contentType: contentType || 'image/png'
      }
    });

    await form.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route GET /api/form/all
router.get('/all', async (req, res) => {
  try {
    const forms = await Form.find({}, { uploadImage: 0 }); // exclude image buffer
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route GET /api/form/image/:id
router.get('/image/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form || !form.uploadImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', form.uploadImage.contentType);
    res.send(form.uploadImage.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
