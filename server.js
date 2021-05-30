const express = require('express');
const cors = require('cors');
const path = require('path');

const db = require('./db.js')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

const concertsRoutes = require('./routes/concerts.routes.js');
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...'});
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});