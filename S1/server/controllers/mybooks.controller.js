const { MyBookModel } = require("../models/mybook.model");

const getMyBooks = async (req, res) => {
  try {
    const books = await MyBookModel.find({ userId: req.body.userId }).populate("bookId");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addMyBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const existing = await MyBookModel.findOne({ userId: req.body.userId, bookId });
    if (existing) return res.status(409).json({ msg: "Book already in MyBooks" });

    const newEntry = new MyBookModel({
      userId: req.body.userId,
      bookId,
      status: "Want to Read",
      rating: 0
    });
    await newEntry.save();
    res.status(201).json({ msg: "Book added to MyBooks" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;
  try {
    await MyBookModel.findOneAndUpdate({ userId: req.body.userId, bookId }, { status });
    res.status(200).json({ msg: "Status updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  try {
    await MyBookModel.findOneAndUpdate({ userId: req.body.userId, bookId }, { rating });
    res.status(200).json({ msg: "Rating updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getMyBooks, addMyBook, updateStatus, updateRating };
