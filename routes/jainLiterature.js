const express = require('express')
const router = express.Router()
const sanstaController = require('../controllers/jainLiterature')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/jainLiterature', upload.array('images',10) ,sanstaController.create)
router.put('/jainLiterature/:id', upload.array('images',10) ,sanstaController.updateItemById)
router.get('/jainLiterature/:id', sanstaController.getItembyId);
router.get('/jainLiteratures', sanstaController.getItems);
router.delete('/jainLiterature/:id',sanstaController.deleteItemById)


// export default router;
module.exports= router;