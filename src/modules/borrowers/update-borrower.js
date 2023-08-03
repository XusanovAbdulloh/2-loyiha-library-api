const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const patchBorrower = async ({ id, changes }) => {
  const borrower = await Borrower.findOne({ _id: id });
  if (!borrower){ 
    throw new NotFoundError("Borrower not found");
}
  const updated = Borrower.findByIdAndUpdate(id, { ...changes }, { new: true });

  return updated;
};
module.exports = patchBorrower;