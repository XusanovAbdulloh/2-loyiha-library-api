const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggen-in");
const genValidator = require("../../shared/validator");
const {authorschema} = require("./schemas");
const { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("./controllers");

const router = express.Router();

router.post("/authors", isLoggedIn, genValidator(authorschema), createAuthor);
router.get("/authors", isLoggedIn, getAuthors);
router.get("/authors/:id", isLoggedIn, getAuthorById);
router.patch("/authors/:id", isLoggedIn, genValidator(authorschema), updateAuthor);
router.delete("/authors/:id", isLoggedIn, deleteAuthor);

module.exports = router