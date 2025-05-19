const express = require('express')
const router = express.Router()
const shakshaController = require('../controllers/shaksha')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/shaksha', upload.array('images',10) ,shakshaController.shaksha)
router.put('/shaksha/:id', upload.array('images',10) ,shakshaController.updateshakshaByApplicant)
router.get('/shaksha/:id', shakshaController.getshakshabyApplicant);


// export default router;
module.exports= router;