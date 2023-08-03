const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const updateAuthorr = async ({ id, ...changes }) => {
  const author = await Author.find({ _id: id, is_deleted: false });
  if (!author) throw new NotFoundError("Author not found");

  const updated = Author.findByIdAndUpdate(id, { ...changes });
  return updated;
};
module.exports = updateAuthorr;