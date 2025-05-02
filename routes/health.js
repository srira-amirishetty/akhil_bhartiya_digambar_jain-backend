const express = require('express')
const router = express.Router()
const healthController = require('../controllers/health')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/health', upload.single('image') ,healthController.health)

// export default router;
module.exports= router;