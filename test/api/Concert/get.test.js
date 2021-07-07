const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model");
const mongoose = require("mongoose");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

after(() => {
  mongoose.models = {};
});

describe("GET /api/concerts", () => {
  before(async () => {
    const testOne = new Concert({
      _id: "44444140f10a81216cfd4444",
      performer: "John Doe",
      genre: "rock",
      price: 44,
      day: 1,
      image: "xxxx",
    });
    await testOne.save();

    const testTwo = new Concert({
      _id: "55555140f10a81216cfd5555",
      performer: "Amanda Doe",
      genre: "jazz",
      price: 55,
      day: 2,
      image: "yyyy",
    });
    await testTwo.save();
  });

  it("/ should return all concerts", async () => {
    const res = await request(server).get("/api/concerts");
    const expectedLength = 2;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(expectedLength);
  });

  it("/:id should return one concert by :id ", async () => {
    const res = await request(server).get(
      "/api/concerts/44444140f10a81216cfd4444"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
