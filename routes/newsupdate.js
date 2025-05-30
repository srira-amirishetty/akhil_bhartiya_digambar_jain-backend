const express = require('express')
const router = express.Router()
const newsupdateController = require('../controllers/newsupdate')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/newsupdate', upload.array('images',10) ,newsupdateController.newsupdate)
router.put('/newsupdate/:id', upload.array('images',10) ,newsupdateController.updatenewsupdateByApplicant)
router.get('/newsupdate/:id', newsupdateController.getnewsupdatebyApplicant);
router.get('/newsupdates', newsupdateController.getnewsupdates);
router.delete('/newsupdate/:id',newsupdateController.deleteItemById)

// export default router;
module.exports= router;