const Loan = require("./Loan");

const listLoans = async ({ q, page, sort, filters }) => {
  const { limit = 10, offset = 0 } = page || {};
  const { by = "out_date", order = "desc" } = sort || {};
  const { admin, borrower, book, status } = filters || {};
  const filter = {};
  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }
  if (admin) {
    filter.admin = admin;
  }
  if (borrower) {
    filter.borrower = borrower;
  }
  if (book) {
    filter.book = book;
  }
  if (status) {
    filter.status = status;
  }

  const total = await Loan.countDocuments(filter);
  const loans = await Loan.find(filter).sort({ [by]: order === "desc" ? -1 : 1 })
    .skip(offset)
    .limit(limit)
    // .populate("Admin", "full_name")
    // .populate("Borrower", "full_name")
    // .populate("Book", "title copies");

  return { total, limit, offset, loans };
};

module.exports = listLoans;