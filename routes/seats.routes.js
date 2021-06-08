const express = require("express");
const router = express.Router();
const db = require("./../db");

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats/:id").get((req, res) => {
  res.json(db.seats.filter((data) => data.id == req.params.id));
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const newSeat = {
    id: db.seats.length + 1,
    day,
    seat,
    client,
    email,
  };
  if (
    db.seats.filter(
      (data) => data.day == newSeat.day && data.seat == newSeat.seat
    ).length > 0
  ) {
    res.json({ message: "The slot is already taken..." });
  } else {
    db.seats.push(newSeat);
    req.io.emit("seatsUpdated", db.seats);
    res.json({ message: "OK" });
  }
});

router.route("/seats/:id").put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = req.params.id;
  const newSeats = {
    id,
    day,
    seat,
    client,
    email,
  };
  const updateSeats = db.seats.find((data) => data.id == id);
  const index = db.seats.indexOf(updateSeats);

  db.seats[index] = newSeats;

  res.json({ message: "OK" });
});

router.route("/seats/:id").delete((req, res) => {
  const id = req.params.id;

  const dataToDelete = db.seats.find((data) => (data.id = id));
  const index = db.seats.indexOf(dataToDelete);
  db.seats.splice(index, 1);

  res.json({ message: "OK" });
});

module.exports = router;
