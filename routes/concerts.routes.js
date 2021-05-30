const express = require('express');
const router = express.Router();
const db = require('./../db');



router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});


router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(data => data.id == req.params.id));
});


router.route('/concerts').post((req, res) => {
  const {performer,
    genre, 
    price,
    day,
    image } = req.body;
  const newConcerts = {
      id: db.concerts.length + 1,
      performer,
      genre, 
      price,
      day,
      image,
  }
  db.concerts.push(newConcerts);
  res.json({ message: 'OK' })
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = req.params.id;
  const newConcerts = {
    id,
    performer,
    genre, 
    price,
    day,
    image,
    
  }
  const updateConcerts = db.concerts.find(data => data.id == id)
  const index = db.concerts.indexOf(updateTestimonial);

  db.concerts[index] = newConcerts;

  res.json({ message: "OK" });
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;

  const dataToDelete = db.concerts.find(data => data.id = id);
  const index = db.concerts.indexOf(dataToDelete);
  db.concerts.splice(index, 1);

  res.json({ message: "OK" });
});

module.exports = router;