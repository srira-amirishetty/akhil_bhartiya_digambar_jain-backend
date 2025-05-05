const express = require('express');
const router = express.Router();
const {
  createMember,
  getAllMembers,
  getImage
} = require('../controllers/addMemberController');

// Needed to parse raw form-data (no middleware like multer)
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/members', createMember);
router.get('/members', getAllMembers);
router.get('/members/image/:id', getImage);

module.exports = router;
