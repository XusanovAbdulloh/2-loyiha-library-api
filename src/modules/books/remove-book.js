const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");

const removeBook = async ({ id }) => {
  const existing = await Book.findOne({ _id: id, is_deleted: false });

  if (!existing) { 
    throw new NotFoundError("Book not found")
  }

  return await Book.findByIdAndUpdate(id, { is_deleted: true });
};
module.exports = removeBook;