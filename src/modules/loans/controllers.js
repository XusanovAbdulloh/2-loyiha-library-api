const httpValidator = require("../../shared/http-validator");
const { postLoanSchema, listLoanSchema, showLoanSchema } = require('./schemas');
const creatLoan = require('./create-loan');
const listLoans = require('./list-loans');
const getLoan = require("./get-loan");

const createLoan = async (req, res) => {
  try {
    httpValidator({ body: req.body }, postLoanSchema);
    console.log(req.user);
    const data = await creatLoan({ ...req.body, admin: req.user.adminId });
  
    res.json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};

const getLoans = async (req, res) => {
  try {
    httpValidator({ query: req.query }, listLoanSchema);
    const data = await listLoans(req.query);

    res.json({
      data: data,
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};

const getLoanById = async (req, res) => {
  try {
    httpValidator({ params: req.params }, showLoanSchema);

    const result = await getLoan(req.params);

    res.json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};


module.exports= {
    createLoan,
    getLoanById,
    getLoans,
}