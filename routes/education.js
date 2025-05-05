const express = require('express')
const router = express.Router()
const educationController = require('../controllers/education')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/education', upload.array('images',10) ,educationController.health)
router.put('/education/:applicantId', upload.array('images',10) ,healthController.updateeducationByApplicant)
router.get('/educationDataById/:applicantId', educationController.geteducationbyApplicant);


// export default router;
module.exports= router;