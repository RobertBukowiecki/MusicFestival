const express = require("express");
const cors = require("cors");
const path = require("path");
const socket = require("socket.io");
const mongoose = require("mongoose");
const helmet = require("helmet");
const app = express();

mongoose.connect(
  "mongodb+srv://robert:adminadmin@cluster0.wgcui.mongodb.net/NewWaveDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", (err) => console.log("Error " + err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/build")));
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(helmet());

const concertsRoutes = require("./routes/concerts.routes.js");
const testimonialsRoutes = require("./routes/testimonials.routes");
const seatsRoutes = require("./routes/seats.routes");

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", testimonialsRoutes); // add testimonials routes to server
app.use("/api", concertsRoutes); // add concerts routes to server
app.use("/api", seatsRoutes); // add seats routes to server

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New socket!");
});

module.exports = server;
