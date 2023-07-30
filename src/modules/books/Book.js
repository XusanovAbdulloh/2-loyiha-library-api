const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  copies: { type: Number, default: 0 },
  is_deleted: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;