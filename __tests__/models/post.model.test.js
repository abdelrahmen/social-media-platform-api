const mongoose = require("mongoose");
const Post = require("../models/post.model.test");
require("dotenv").config();

describe("Post model", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

});
