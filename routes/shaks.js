const express = require('express')
const router = express.Router()
const shakaController = require('../controllers/shaka')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/shaka', upload.array('images',10) ,shakaController.shaka)
router.put('/shaka/:id', upload.array('images',10) ,shakaController.updateshakaByApplicant)
router.get('/shaka/:id', shakaController.getshakabyApplicant);


// export default router;
module.exports= router;