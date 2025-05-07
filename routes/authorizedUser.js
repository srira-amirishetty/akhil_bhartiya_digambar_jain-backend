const express = require('express')
const router = express.Router()
const authorizedUserController = require('../controllers/authorizedUser')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/authorizedUser', upload.single('image') ,authorizedUserController.create)
router.put('/authorizedUser/:id', upload.array('images',10) ,authorizedUserController.update)
router.get('/authorizedUserGetbyID/:id', authorizedUserController.getItemById);
router.delete('/authorizedUserDelete/:id',authorizedUserController.deleteItemById)


// export default router;
module.exports= router;