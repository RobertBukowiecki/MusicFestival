const Concert = require("../concert.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Concert", () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "genre, performer, day, price, image" args', () => {
    const con = new Concert({});

    con.validate((err) => {
      expect(err.errors).to.exist;
    });
  });

  it("should throw an error if there aren`t all arguments", () => {
    const con1 = new Concert({
      performer: "band1",
      genre: "rock1",
      price: 10,
      day: 1,
    });
    const con2 = new Concert({ performer: "band2", genre: "rock2", price: 10 });
    const con3 = new Concert({ performer: "band3", genre: "rock3" });
    const con4 = new Concert({ performer: "band4" });
    const con5 = new Concert({ performer: "band5" });
    const con6 = new Concert({
      genre: "rock6",
      price: 10,
      day: 2,
      image: "photo6",
    });
    const con7 = new Concert({ price: 20, day: 2 });
    const con8 = new Concert({
      performer: "band8",
      genre: "rock8",
      image: "photo8",
    });

    const cases = [con1, con2, con3, con4, con5, con6, con7, con8];
    for (let variant of cases) {
      const con = new Concert({ variant });

      con.validate((err) => {
        expect(err.errors.performer).to.exist;
        expect(err.errors.genre).to.exist;
        expect(err.errors.price).to.exist;
        expect(err.errors.day).to.exist;
        expect(err.errors.image).to.exist;
      });
    }
  });

  it("should throw an error if arguments have bad type", () => {
    const con1 = new Concert({
      performer: [],
      genre: [],
      price: [],
      day: [],
      image: [],
    });
    const con2 = new Concert({
      performer: {},
      genre: {},
      price: {},
      day: {},
      image: {},
    });

    const cases = [con1, con2];
    for (let variant of cases) {
      const con = new Concert({ variant });

      con.validate((err) => {
        expect(err.errors.performer).to.exist;
        expect(err.errors.genre).to.exist;
        expect(err.errors.price).to.exist;
        expect(err.errors.day).to.exist;
        expect(err.errors.image).to.exist;
      });
    }
  });

  it("should throw good if all arguments are correct", () => {
    const con = new Concert({
      performer: "band1",
      genre: "rock1",
      price: 10,
      day: 1,
      image: "photo1",
    });

    con.validate((err) => {
      expect(err).to.not.exist;
    });
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
