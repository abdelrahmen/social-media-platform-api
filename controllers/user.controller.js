const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Logger = require("../services/logger.service");

const logger = new Logger("user.controller");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    logger.warn("Missing required fields in registerUser function");
    return res.status(400).json({ message: "All fields are required!" });
  }

  const user = await User.findOne({ email });

  if (user) {
    logger.warn("User already registered in registerUser function");
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
    logger.info("New user registered in registerUser function");
    return res.status(201).json({ _id: newUser._id, email: User.email });
  } else {
    logger.error("Error creating new user in registerUser function");
    return res.status(400).json({ message: "User data is not valid." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn("Invalid email in loginUser function");
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn("Incorrect password in loginUser function");
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //1 month
    });

    logger.info("User logged in successfully in loginUser function");
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Error in loginUser function: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    logger.info(`Retrieved ${users.length} users in getAllUsers function`);
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error in getAllUsers function: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      logger.warn(
        `User with ID ${req.params.id} not found in deleteUser function`
      );
      return res.status(404).json({ message: "User not found" });
    }
    logger.info(
      `User with ID ${req.params.id} deleted successfully in deleteUser function`
    );
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Error in deleteUser function: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
