const express = require('express')
const router = express.Router()
const financeController = require('../controllers/Shayatafinance')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/finance', upload.array('images',10) ,financeController.finance)
router.put('/finance/:applicantId', upload.array('images',10) ,financeController.updatefinanceByApplicant)
router.get('/financeDataById/:applicantId', financeController.getfinancebyApplicant);


// export default router;
module.exports= router;