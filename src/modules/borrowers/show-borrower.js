const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const getBorrower = async ({ id }) => {
  const borrower = await Borrower.findOne({ _id: id});

  if (!borrower) {
    throw new NotFoundError("Borrower not found");
}

  return borrower;
};

module.exports = getBorrower;