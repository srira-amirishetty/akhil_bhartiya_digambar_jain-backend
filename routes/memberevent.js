const express = require('express')
const router = express.Router()
const membereventController = require('../controllers/memberevent')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/memberevent', upload.array('images',10) ,membereventController.memberevent)
router.put('/memberevent/:id', upload.array('images',10) ,membereventController.updatemembereventByApplicant)
router.get('/memberevent/:id', membereventController.getmembereventbyApplicant);


// export default router;
module.exports= router;