const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ message: "This user is already registered." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    return res.status(201).json({ _id: newUser._id, email: User.email });
  } else {
    return res.status(400).json({ message: "User data is not valid." });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
