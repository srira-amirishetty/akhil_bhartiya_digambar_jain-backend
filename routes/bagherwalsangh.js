const express = require('express')
const router = express.Router()
const bagherwalsanghController = require('../controllers/bagherwalsangh')

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/bagherwalsangh', upload.array('images',10) ,bagherwalsanghController.bagherwalsangh)
router.put('/bagherwalsangh/:id', upload.array('images',10) ,bagherwalsanghController.updatebagherwalsanghByApplicant)
router.get('/bagherwalsangh/:id', bagherwalsanghController.getbagherwalsanghbyApplicant);
router.get('/bagherwalsanghs', bagherwalsanghController.getbagherwalsanghs);
router.delete('/bagherwalsangh/:id',bagherwalsanghController.deleteItemById)


// export default router;
module.exports= router;