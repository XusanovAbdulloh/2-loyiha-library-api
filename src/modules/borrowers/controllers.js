const Borrower = require('./Borrower');
const creatBorrower = require('./create-borrower');
const httpValidator = require("./../../shared/http-validator/index.js");
const { listBorrowerSchema, showBorrowerSchema, patchBorrowerSchema, deleteBorrowerSchmea, postBorrowerSchema } = require('./schemas');
const listBorrowers = require('./list-borrowers');
const getBorrower = require('./show-borrower');
const patchBorrower = require('./update-borrower');
const removeBorrower = require('./remove-borrower');

const createBorrower = async (req, res) => {
  try {
    httpValidator({ body: req.body }, postBorrowerSchema);

    const result = await creatBorrower(req.body);
    console.log(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const getBorrowers = async (req, res) => {
    try {
      httpValidator({ query: req.query }, listBorrowerSchema);
      const data = await listBorrowers(req.query)
      res.json({data: data})
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };


const getBorrowerById = async (req, res) => {
  try {
    httpValidator({ params: req.params }, showBorrowerSchema);
    const result = await getBorrower(req.params);

    res.json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const updateBorrower = async (req, res) => {
  try {
    httpValidator({ body: req.body, params: req.params }, patchBorrowerSchema);

    const data = await patchBorrower({ id: req.params.id, changes: req.body });

    res.json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const deleteBorrower = async (req, res) => {
  try {
    httpValidator({ params: req.params }, deleteBorrowerSchmea);

    const borrower = await removeBorrower(req.params);

    res.json({
      data: borrower,
    });;
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"}) 
  }
};

module.exports = {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
};
