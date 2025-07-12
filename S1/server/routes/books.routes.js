const express = require("express");
const { BookModel } = require("../models/book.model");

const bookRouter = express.Router();

// Get all public books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch books", error: err.message });
  }
});

module.exports = { bookRouter };
