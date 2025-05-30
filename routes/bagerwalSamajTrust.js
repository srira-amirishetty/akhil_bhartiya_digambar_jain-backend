const express = require('express')
const router = express.Router()
const sanstaController = require('../controllers/bagerwalSamajTrust')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/bagerwalSamajTrust', upload.array('images',10) ,sanstaController.bagerwalSamajTrust)
router.put('/bagerwalSamajTrust/:id', upload.array('images',10) ,sanstaController.updatebagerwalSamajTrustByApplicant)
router.get('/bagerwalSamajTrust/:id', sanstaController.getbagerwalSamajTrustbyApplicant);
router.get('/bagerwalSamajTrusts', sanstaController.getbagerwalSamajTrusts);
router.delete('/bagerwalSamajTrust/:id',sanstaController.deleteItemById)


// export default router;
module.exports= router;