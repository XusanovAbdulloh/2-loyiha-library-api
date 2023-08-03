const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const removeAuthor = async ({ id }) => {
  const existing = await Author.find({ _id: id, is_deleted: false });

  if (!existing) throw new NotFoundError("Author not found");

  return await Author.findByIdAndUpdate(id, { is_deleted: true });
};
module.exports = removeAuthor;