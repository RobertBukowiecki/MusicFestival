const express = require('express');
const router = express.Router();
const db = require('./../db');


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)])
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(data => data.id == req.params.id));
});


router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;
  const newTestimonial = {
      id: db.testimonials.length + 1,
      author,
      text,
  }
  db.testimonials.push(newTestimonial);
  res.json({ message: 'OK' })
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  const newTestimonial = {
    id,
    author,
    text,
  }
  const updateTestimonial = db.testimonials.find(data => data.id == id)
  const index = db.testimonials.indexOf(updateTestimonial);

  db.testimonials[index] = newTestimonial;

  res.json({ message: "OK" });
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;

  const dataToDelete = db.testimonials.find(data => data.id = id);
  const index = db.testimonials.indexOf(dataToDelete);
  db.testimonials.splice(index, 1);

  res.json({ message: "OK" });
});

module.exports = router;