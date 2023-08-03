const express = require("express")
const isLoggedIn = require("../../shared/auth/is-loggen-in.js")
const { createBorrower, getBorrowers, getBorrowerById, updateBorrower, deleteBorrower } = require("./controllers.js")

const router = express.Router()

router.post("/borrowers", isLoggedIn, createBorrower);
router.get("/borrowers", isLoggedIn, getBorrowers);
router.get("/borrowers/:id", isLoggedIn, getBorrowerById);
router.patch("/borrowers/:id", isLoggedIn, updateBorrower);
router.delete("/borrowers/:id", isLoggedIn, deleteBorrower);

module.exports = router