const Concert = require("../concert.model");
const expect = require("chai").expect;
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");

describe("Concert", () => {
  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getUri();

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe("Reading data", () => {
    beforeEach(async () => {
      const testEmpOne = new Concert({
        genre: "Rock",
        performer: "John Doe",
        day: 2,
        price: 12,
        image: "xxxxx",
      });
      await testEmpOne.save();

      const testEmpTwo = new Concert({
        genre: "Jazz",
        performer: "Max Doe",
        day: 1,
        price: 22,
        image: "yyyyyy",
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "genre, performer, day, price, image" with "findOne" method', async () => {
      const genre = await Concert.findOne({ genre: "Rock" });
      const expectedGenre = "Rock";
      expect(genre.genre).to.be.equal(expectedGenre);

      const performer = await Concert.findOne({ performer: "John Doe" });
      const expectedPerformer = "John Doe";
      expect(performer.performer).to.be.equal(expectedPerformer);

      const day = await Concert.findOne({ day: 1 });
      const expectedDay = 1;
      expect(day.day).to.be.equal(expectedDay);

      const price = await Concert.findOne({ price: 22 });
      const expectedPrice = 22;
      expect(price.price).to.be.equal(expectedPrice);

      const image = await Concert.findOne({ image: "xxxxx" });
      const expectedImage = "xxxxx";
      expect(image.image).to.be.equal(expectedImage);
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });
});
