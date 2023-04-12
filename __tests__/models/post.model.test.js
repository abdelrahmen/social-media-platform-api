const mongoose = require("mongoose");
const Post = require("../../models/post.model");
const User = require("../../models/user.model");

require("dotenv").config();

describe("Post model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    require("dotenv").config();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a required text field", async () => {
    const post = new Post({
      createdBy: new mongoose.Types.ObjectId(),
    });
    await expect(post.validate()).rejects.toThrow();
  });

  it("has an optional image field", async () => {
    const post = new Post({
      text: "Lorem ipsum",
      createdBy: new mongoose.Types.ObjectId(),
    });
    await expect(post.validate()).resolves.not.toThrow();
  });

  it.skip("has a createdBy field that references a User", async () => {
    const user = new User({ name: "Alice", email:"someemail@mail.com", password:'123' });
    await user.save();

    const post = new Post({
      text: "Lorem ipsum",
      createdBy: user._id,
    });

    await expect(post.validate()).resolves.not.toThrow();
  });

  
});
