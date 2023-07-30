const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
