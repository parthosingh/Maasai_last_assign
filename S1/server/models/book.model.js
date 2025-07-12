const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String, required: true },
  availability: { type: Boolean, default: true }
}, {
  versionKey: false,
  timestamps: true
});

const BookModel = mongoose.model("Book", bookSchema);

module.exports = { BookModel };
