const Seat = require("../models/seat.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Seat.findById(req.params.id);
    if (!data) res.status(404).json({ message: "Not found" });
    else res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const seatExists = await Seat.findOne({ $and: [{ seat: seat, day: day }] });
    const newSeat = new Seat({
      day,
      seat,
      client,
      email,
    });
    if (seatExists) {
      res.status(409).json({ message: "The slot is already taken..." });
    } else {
      await newSeat.save();
      const seats = await Seat.find();
      req.io.emit("seatsUpdated", seats);
      res.json({ message: "OK" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = {
      day,
      seat,
      client,
      email,
    };
    await Seat.findOneAndUpdate({ _id: req.params.id }, newSeat, (err, doc) => {
      if (err) {
        res.status(404).json({ message: "Not found..." });
      } else {
        res.json(doc);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    await Seat.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
      if (err) {
        res.status(404).json({ message: "Not found..." });
      } else {
        res.json(doc);
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
