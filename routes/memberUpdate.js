const express = require('express');
const router = express.Router();
const {
  updatePersonalInfo,
  updateBusinessInfo,
  updateOtherInfo,
} = require('../controllers/memberupdate');

router.put('/update/personal/:id', updatePersonalInfo);

router.put('/update/business/:id', updateBusinessInfo);

router.put('/update/other/:id', updateOtherInfo);

module.exports = router;