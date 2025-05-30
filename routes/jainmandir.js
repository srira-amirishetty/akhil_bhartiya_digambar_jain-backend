const express = require('express')
const router = express.Router()
const jainmandirController = require('../controllers/jainmandir')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/jainmandir', upload.array('images',10) ,jainmandirController.jainmandir)
router.put('/jainmandir/:id', upload.array('images',10) ,jainmandirController.updatejainmandirByApplicant)
router.get('/jainmandir/:id', jainmandirController.getjainmandirbyApplicant);
router.get('/jainmandirs', jainmandirController.getjainmandirs);
router.delete('/jainmandir/:id',jainmandirController.deleteItemById)


// export default router;
module.exports= router;