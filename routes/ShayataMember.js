const express = require('express')
const router = express.Router()
const shayataController = require('../controllers/ShayataMember')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// Step 1: Create new application
router.post('/Shayata-application',upload.fields([
    { name: 'applicantImage', maxCount: 1 },
    { name: 'beneficiaryImage', maxCount: 1 }
  ]), shayataController.createApplication);

// Update application by ID
router.put('Shayata-application-update/:id',upload.fields([
    { name: 'applicantImage', maxCount: 1 },
    { name: 'beneficiaryImage', maxCount: 1 }
  ]), shayataController.updateApplication);

// Get application by ID
router.get('Shayata-applicantGetbyId/:id', shayataController.getApplicationById);
router.get('get-all-shayata-applicants',shayataController.getAllApplications)
router.get('get-applicants-by-search',shayataController.searchApplicantByName)


module.exports = router;