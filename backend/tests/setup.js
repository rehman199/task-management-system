const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Task = require("../models/tasksModel");

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // CLEANUP
  await Task.deleteMany({});
  await mongoose.disconnect();
  await mongod.stop();
});

// test suite must contain at least one test
describe("Dummy Test Suite", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
