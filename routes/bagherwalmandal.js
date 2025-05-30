const express = require('express');
const router = express.Router();
const bagherwalmandalController = require('../controllers/bagherwalmandal')
// const bagherwalmandalController = require('../controllers/bagherwalmandalController');
router.post('/submit', bagherwalmandalController.submitData);

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/bagherwalmandal', upload.array('images',10) ,bagherwalmandalController.bagherwalmandal)
router.put('/bagherwalmandal/:id', upload.array('images',10) ,bagherwalmandalController.updatebagherwalmandalByApplicant)
router.get('/bagherwalmandal/:id', bagherwalmandalController.getbagherwalmandalbyApplicant);
router.get('/bagherwalmandals', bagherwalmandalController.getbagherwalmandals);
router.delete('/bagherwalmandal/:id',bagherwalmandalController.deleteItemById)


// export default router;
module.exports= router;