const Author = require("./Author");

const listAuthors = async ({ q, page, sort, filters }) => {
  const { limit = 10, offset = 0 } = page || {};
  const { by = "full_name", order = "desc" } = sort || {};
  const sortQuery = { [by]: order === "desc" ? -1 : 1 };
  const { is_deleted } = filters || {};

  const filter = {};
  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }
  if (is_deleted) {
    filter.is_deleted = is_deleted;
  }
  const total = await Author.countDocuments(filter);
  const authors = await Author.find(filter)
    .sort(sortQuery)
    .skip(offset)
    .limit(limit);

  return {limit, offset , total, authors };
};

module.exports = listAuthors;