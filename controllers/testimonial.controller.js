const Testimonial = require("../models/testimonial.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const data = await Testimonial.findOne().skip(rand);
    if (!data) res.status(404).json({ message: "Not found" });
    else res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Testimonial.findById(req.params.id);
    if (!data) res.status(404).json({ message: "Not found" });
    else res.json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { author, text } = req.body;

    await Testimonial.findOneAndUpdate(
      { _id: req.params.id },
      { author, text },
      (err, doc) => {
        if (err) {
          res.status(404).json({ message: "Not found..." });
        } else {
          res.json(doc);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    await Testimonial.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
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
