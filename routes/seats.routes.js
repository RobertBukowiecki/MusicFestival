const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seat.controller");

router.get("/seats", seatController.getAll);
router.get("/seats/:id", seatController.getById);
router.post("/seats", seatController.post);
router.put("/seats/:id", seatController.edit);
router.delete("/seats/:id", seatController.delete);

module.exports = router;
