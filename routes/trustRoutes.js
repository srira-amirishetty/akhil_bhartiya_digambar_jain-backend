const express = require("express");
const router = express.Router();
const trustController = require("../controllers/trustController");

router.get("/", trustController.getTrust);
router.put("/", trustController.updateTrust);

router.post("/karyakartas", trustController.addKaryakarta);
router.put("/karyakartas/:id", trustController.editKaryakarta);
router.delete("/karyakartas/:id", trustController.deleteKaryakarta);

module.exports = router;
