const express = require('express')
const router = express.Router()
const bankdetailsController = require('../controllers/ShayataBank')
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/ShayataBank-create', upload.single('image') ,bankdetailsController.create)
router.put('/ShayataBank-update/:applicantId', upload.single('image') ,bankdetailsController.update)
router.get('/ShayataBank-GetbyID/:applicantId', bankdetailsController.getItemById);
// router.delete('/ShayataBank-Delete/:id',authorizedUserController.deleteItemById)


// export default router;
module.exports= router;