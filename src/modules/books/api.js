const express = require("express")
const isLoggedIn = require("../../shared/auth/is-loggen-in.js")
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require("./controllers.js")

const router = express.Router()

router.post("/books", isLoggedIn, createBook);
router.get("/books", isLoggedIn, getBooks);
router.get("/books/:id", isLoggedIn, getBookById);
router.patch("/books/:id", isLoggedIn, updateBook);
router.delete("/books/:id", isLoggedIn, deleteBook);

module.exports = router