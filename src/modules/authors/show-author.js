const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const getAuthor = async ({ id }) => {
  const author = await Author.find({ _id: id});

  if (!author){ 
    throw new NotFoundError("Author not found")
  }

  return author;
};

module.exports = getAuthor;