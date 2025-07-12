const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(409).json({ msg: "User already exists" });

    const hashedPass = await bcrypt.hash(pass, Number(process.env.SALT_ROUNDS));
    const user = new UserModel({ name, email, pass: hashedPass });
    await user.save();
    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const loginUser = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY);
    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const logoutUser = async (req, res) => {
  // Just for frontend simulation (optional if not using cookies)
  res.status(200).json({ msg: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
