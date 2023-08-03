const { NotFoundError } = require("../../shared/errors");
const Author = require("../authors/Author");
const Publisher = require("../publishers/Publisher");
const Book = require("./Book");

const addBook = async ({ publisher, title, author, copies }) => {
  const exsitingPublisher = await Publisher.findById(publisher);
  if (!exsitingPublisher) {
    throw new NotFoundError("Publisher not found");
}
  const exsitingAuthor = await Author.findById(author);
  if (!exsitingAuthor) {
    throw new NotFoundError("Author not found");
}

  const result = await Book.create({
    publisher,
    title,
    author,
    copies,
  });

  return result;
};

module.exports = addBook;