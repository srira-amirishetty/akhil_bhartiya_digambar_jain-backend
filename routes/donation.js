const express = require('express');
const router = express.Router();
const { createDonation } = require('../controllers/donation');

router.post('/donation', createDonation);

module.exports = router;