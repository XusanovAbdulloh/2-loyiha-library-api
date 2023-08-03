const Borrower = require("./Borrower");

const listBorrowers = async ({ q, page, sort, filters }) => {
  const { limit = 10, offset = 0 } = page || {};
  const { by = "full_name", order = "desc" } = sort || {};
  const { is_deleted = false } = filters || {};
  const filter = {};

  if (q) {
    filter.full_name = { $regex: q, $options: "i" };
  }

  if (is_deleted !== undefined) {
    filter.is_deleted = is_deleted;
  }
  
  const total = await Borrower.countDocuments(filter);
  const borrowers = await Borrower.find(filter)
    .sort({ [by]: order === "desc" ? -1 : 1 })
    .skip(offset)
    .limit(limit);

  return { total, limit, offset, borrowers };
};

module.exports = listBorrowers;