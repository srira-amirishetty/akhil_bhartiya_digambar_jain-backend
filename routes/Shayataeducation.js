const express = require('express')
const router = express.Router()
const educationController = require('../controllers/Shayataeducation')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/education', upload.array('images',10) ,educationController.education)
router.put('/education/:applicantId', upload.array('images',10) ,educationController.updateeducationByApplicant)
router.get('/educationDataById/:applicantId', educationController.geteducationbyApplicant);


// export default router;
module.exports= router;