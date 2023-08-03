const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");

const getBook = async ({ id }) => {
  const book = await Book.findOne({ _id: id}).populate("publisher").populate("author");

  if (!book) {
    throw new NotFoundError("Book not found");
  }

  return book;
};

module.exports = getBook;