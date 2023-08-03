const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const removeBorrower = async ({ id }) => {
  const existing = await Borrower.find({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Borrower not found");
}

  return await Borrower.findByIdAndUpdate(id, { is_deleted: true });
};
module.exports = removeBorrower;