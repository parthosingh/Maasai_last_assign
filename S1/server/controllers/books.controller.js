const { BookModel } = require("../models/book.model");

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getAllBooks };
