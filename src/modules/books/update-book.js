const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");

const patchBook = async ({ id, ...changes }) => {
  const data = await Book.findOne({ _id: id });
  if (!data){
     throw new NotFoundError("Book not found");
}

  const updated = Book.findByIdAndUpdate(id, { ...changes });
  return updated;
};

module.exports = patchBook;