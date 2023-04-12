const mongoose = require("mongoose");
const User = require("../../models/user.model");
require("dotenv").config();

describe("User model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it.skip("should be able to save a user", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };
    const user = new User(userData);
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.createdAt).toBeDefined();
  });

  it("should require name, email, and password", async () => {
    const user = new User({});
    let error;
    try {
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });

  it("should require a unique email", async () => {
    const userData1 = {
      name: "Test User 1",
      email: "test@example.com",
      password: "password123",
    };
    const userData2 = {
      name: "Test User 2",
      email: "test@example.com",
      password: "password456",
    };
    const user1 = new User(userData1);
    const user2 = new User(userData2);
    let error;
    try {
      await user1.save();
      await user2.save();
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.code).toBe(11000);
  });
});
