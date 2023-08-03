const Book = require("./Book");

const listBooks = async ({ q, page, sort, filters }) => {

  const { limit = 10, offset = 0 } = page || {};
  const { by = "copies", order = "desc" } = sort || {};
  const { is_deleted, publisher, author } = filters || {};
  const filter = {};

  if (q) {
    filter.title = { $regex: q, $options: "i" };
  }
  if (is_deleted !== undefined) {
    filter.is_deleted = is_deleted;
  }
  if (publisher) {
    filter.publisher = publisher;
  }
  if (author) {
    filter.author = author;
  }

  const total = await Book.countDocuments(filter);
  const books = await Book.find(filter).sort({ [by]: order === "desc" ? -1 : 1 })
    .skip(offset)
    .limit(limit)
    .populate("author")
    .populate("publisher");

  return { total, limit, offset, books };
};

module.exports = listBooks;