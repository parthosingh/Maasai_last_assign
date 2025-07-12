const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router()
userRouter.post("/", async (req, res) => {
  const { name, pass, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Hash password
    bcrypt.hash(pass, Number(process.env.SALT_ROUNDS), async (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "Error hashing password", error: err });
      }

      const newUser = new UserModel({ name, email, pass: hash });
      await newUser.save();

      res.status(201).json({ msg: "You have been successfully registered!" });
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});


userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const matchingUser = await UserModel.findOne({ email });

    if (!matchingUser) {
      return res.status(401).json({ msg: "User not found" });
    }

    bcrypt.compare(pass, matchingUser.pass, (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "Error during password comparison" });
      }

      if (result) {
        const token = jwt.sign({ userId: matchingUser._id }, process.env.SECRET_KEY);
        return res.status(200).json({ msg: "Login successful", token });
      } else {
        return res.status(401).json({ msg: "Invalid password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});


module.exports={userRouter}