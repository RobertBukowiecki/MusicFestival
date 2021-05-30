const express = require('express');

const db = require('./db.js')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)])
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(data => data.id == req.params.id));
});


app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  const newTestimonial = {
      id: db.length + 1,
      author,
      text,
  }
  db.push(newTestimonial);
  res.json({ message: 'OK' })
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = req.params.id;
  const newTestimonial = {
    id,
    author,
    text,
  }
  const updateTestimonial = db.find(data => data.id == id)
  const index = db.indexOf(updateTestimonial);

  db[index] = newTestimonial;

  res.json({ message: "OK" });
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;

  const dataToDelete = db.find(data => data.id = id);
  const index = db.indexOf(dataToDelete);
  db.splice(index, 1);

  res.json({ message: "OK" });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});