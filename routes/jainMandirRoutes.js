const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/jainMandirController');

// Setup multer
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), controller.createMandir);
router.get('/', controller.getAllMandirs);
router.get('/:id', controller.getMandirById);
router.put('/:id', upload.single('image'), controller.updateMandir);
router.delete('/:id', controller.deleteMandir);

module.exports = router;
