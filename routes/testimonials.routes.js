const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonial.controller");

router.get("/testimonials", testimonialController.getAll);
router.get("/testimonials/random", testimonialController.getRandom);
router.get("/testimonials/:id", testimonialController.getById);
router.post("/testimonials", testimonialController.post);
router.put("/testimonials/:id", testimonialController.edit);
router.delete("/testimonials/:id", testimonialController.delete);

module.exports = router;
