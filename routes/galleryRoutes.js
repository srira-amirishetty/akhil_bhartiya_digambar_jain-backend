const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/galleryController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/', upload.single('image'), controller.createGallery);
router.get('/', controller.getAllGallery);
router.get('/:id', controller.getGalleryById);
router.put('/:id', upload.single('image'), controller.updateGallery);
router.delete('/:id', controller.deleteGallery);

module.exports = router;
