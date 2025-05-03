const express = require('express')
const router = express.Router()
const healthController = require('../controllers/Shayatahealth')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// Step 1: Create new application
router.post('/',upload.fields([
    { name: 'applicantImage', maxCount: 1 },
    { name: 'beneficiaryImage', maxCount: 1 }
  ]), shayataController.createApplication);

// Update application by ID
router.put('/:id',upload.fields([
    { name: 'applicantImage', maxCount: 1 },
    { name: 'beneficiaryImage', maxCount: 1 }
  ]), shayataController.updateApplication);

// Get application by ID
router.get('/:id', shayataController.getApplicationById);

module.exports = router;