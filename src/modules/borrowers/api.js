const express = require("express")
const {borrowerSchema, borrowerEditSchema} = require("./schemas.js")
const isLoggedIn = require("../../shared/auth/is-loggen-in.js")
const { createBorrower, getBorrowers, getBorrowerById, updateBorrower, deleteBorrower } = require("./controllers.js")
const genValidator = require("../../shared/validator/index.js")

const router = express.Router()

router.post("/borrowers", isLoggedIn, genValidator(borrowerSchema),createBorrower);
router.get("/borrowers", isLoggedIn, getBorrowers);
router.get("/borrowers/:id", isLoggedIn, getBorrowerById);
router.patch("/borrowers/:id", isLoggedIn, genValidator(borrowerEditSchema), updateBorrower);
router.delete("/borrowers/:id", isLoggedIn, deleteBorrower);

module.exports = router