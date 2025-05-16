const express = require('express');
const router = express.Router();
const { searchMembers, getMemberById, updateDOB } = require('../controllers/memberUpdateController');

router.get('/search', searchMembers);
router.get('/:id', getMemberById);
router.put('/:id/birthdate', updateDOB);

module.exports = router;