const Borrower = require("./Borrower");

const creatBorrower = async (data) => {
  const result = await Borrower.create({
    ...data,
  });

  return result;
};

module.exports = creatBorrower;