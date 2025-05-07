const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  addLiterature,
  getAllLiterature,
  getLiteratureById,
  updateLiterature,
  deleteLiterature,
} = require('../controllers/jainLiteratureController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), addLiterature);
router.get('/', getAllLiterature); 
router.get('/:id', getLiteratureById);
router.put('/:id', upload.single('image'), updateLiterature);
router.delete('/:id', deleteLiterature);

module.exports = router;
