const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Step-by-step endpoints
router.post('/personal-info', memberController.savePersonalInfo);
router.post('/business-info', memberController.saveBusinessInfo);
router.post('/other-info', memberController.saveOtherInfo);
router.get('/get-members',memberController.getMembers)

module.exports = router;
