const express = require('express');

const db = require('./db.js')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const concertsRoutes = require('./routes/concerts.routes.js');
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...'});
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});