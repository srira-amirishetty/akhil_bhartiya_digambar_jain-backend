const express = require('express')
const router = express.Router()
const sanstaController = require('../controllers/sansta')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/sansta', upload.array('images',10) ,sanstaController.sansta)
router.put('/sansta/:id', upload.array('images',10) ,sanstaController.updatesanstaByApplicant)
router.get('/sansta/:id', sanstaController.getsanstabyApplicant);
router.get('/sansta/:id', sanstaController.getsanstas);
router.delete('/sansta/:id',sanstaController.deleteItemById)


// export default router;
module.exports= router;