const express = require('express');
const router = express.Router();
const {
  updatePersonalInfo,
  updateBusinessInfo,
  updateOtherInfo,
} = require('../controllers/memberUpdateController');

// 📌 Update Personal Details (only if phone verified)
router.put('/update/personal/:id', updatePersonalInfo);

// 📌 Update Business Details (only if phone verified)
router.put('/update/business/:id', updateBusinessInfo);

// 📌 Update Other Details (only if phone verified)
router.put('/update/other/:id', updateOtherInfo);

module.exports = router;
