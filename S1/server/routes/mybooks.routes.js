const express = require("express");
const { MyBookModel } = require("../models/mybook.model");
const { auth } = require("../middleware/auth.middleware");

const myBookRouter = express.Router();

// Get books for logged-in user
myBookRouter.get("/", auth, async (req, res) => {
  try {
    const myBooks = await MyBookModel.find({ userId: req.userId }).populate("bookId");
    res.status(200).json(myBooks);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch My Books", error: err.message });
  }
});

// Add book to My Books
myBookRouter.post("/:bookId", auth, async (req, res) => {
  const { bookId } = req.params;

  try {
    const alreadyExists = await MyBookModel.findOne({ userId: req.userId, bookId });
    if (alreadyExists) {
      return res.status(409).json({ msg: "Book already added" });
    }

    const newEntry = new MyBookModel({
      userId: req.userId,
      bookId,
      status: "Want to Read",
      rating: 0,
    });

    await newEntry.save();
    res.status(201).json({ msg: "Book added to My Books" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add book", error: err.message });
  }
});

// Update status
myBookRouter.patch("/:bookId/status", auth, async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;

  try {
    await MyBookModel.findOneAndUpdate(
      { userId: req.userId, bookId },
      { status },
      { new: true }
    );
    res.status(200).json({ msg: "Status updated" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update status", error: err.message });
  }
});

// Update rating
myBookRouter.patch("/:bookId/rating", auth, async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;

  try {
    await MyBookModel.findOneAndUpdate(
      { userId: req.userId, bookId },
      { rating },
      { new: true }
    );
    res.status(200).json({ msg: "Rating updated" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update rating", error: err.message });
  }
});

module.exports = { myBookRouter };
