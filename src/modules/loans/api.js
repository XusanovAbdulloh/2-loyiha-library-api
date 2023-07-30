const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggen-in");
const genValidator = require("../../shared/validator");
const { postLoanSchema } = require("./schemas");
const { createLoan, getLoans, getLoanById } = require("./controllers");

const router = express.Router();

router.post("/loans", isLoggedIn, genValidator(postLoanSchema), createLoan);
router.get("/loans", isLoggedIn, getLoans);
router.get("/loans/:id", isLoggedIn, getLoanById);

module.exports = router