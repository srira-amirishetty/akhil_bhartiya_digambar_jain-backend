const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllMembers, getMemberById, addMember, getProfilePic } = require('../controllers/memberListController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/all', getAllMembers);
router.get('/:id', getMemberById);
router.get('/:id/profile-pic', getProfilePic);
router.post('/add', upload.single('profilePic'), addMember);

module.exports = router;