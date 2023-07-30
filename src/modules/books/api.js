const express = require("express")
const {bookSchema} = require("./schemas.js")
const isLoggedIn = require("../../shared/auth/is-loggen-in.js")
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require("./controllers.js")
const genValidator = require("../../shared/validator/index.js")

const router = express.Router()

router.post("/books", isLoggedIn, genValidator(bookSchema),createBook);
router.get("/books", isLoggedIn, getBooks);
router.get("/books/:id", isLoggedIn, getBookById);
router.patch("/books/:id", isLoggedIn, genValidator(bookSchema), updateBook);
router.delete("/books/:id", isLoggedIn, deleteBook);

module.exports = router