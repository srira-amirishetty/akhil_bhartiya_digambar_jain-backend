const express = require('express')
const router = express.Router()
const samajeventController = require('../controllers/samajevent')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/samajevent', upload.array('images',10) ,samajeventController.samajevent)
router.put('/samajevent/:id', upload.array('images',10) ,samajeventController.updatesamajeventByApplicant)
router.get('/samajevent/:id', samajeventController.getsamajeventbyApplicant);


// export default router;
module.exports= router;