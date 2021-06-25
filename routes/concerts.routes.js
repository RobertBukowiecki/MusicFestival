const express = require("express");
const router = express.Router();
const concertController = require("../controllers/concert.controller");

router.get("/concerts", concertController.getAll);
router.get("/concerts/:id", concertController.getById);
router.post("/concerts", concertController.post);
router.put("/concerts/:id", concertController.edit);
router.delete("/concerts/:id", concertController.delete);

module.exports = router;
