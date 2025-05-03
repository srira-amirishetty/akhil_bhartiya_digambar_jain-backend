const express = require('express')
const router = express.Router()
const healthController = require('../controllers/Shayatahealth')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/health', upload.array('images',10) ,healthController.health)
router.put('/health/:applicantId', upload.array('images',10) ,healthController.updatehealthByApplicant)
router.get('/healthDataById/:applicantId', healthController.gethealthbyApplicant);


// export default router;
module.exports= router;