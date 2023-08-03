const { NotFoundError } = require("../../shared/errors");
const Loan = require("./Loan");

const getLoan = async ({ id }) => {
  const loan = await Loan.findById(id)
  //  .populate("Admin", "full_name")
  //  .populate("Borrower", "full_name")
  //  .populate("Book", "title copies");

  if (!loan) {
    throw new NotFoundError("Loan not found")
  }

  return loan;
};

module.exports = getLoan;