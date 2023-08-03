const httpValidator = require("../../shared/http-validator")
const addBook = require('./addBook');
const getBook = require('./get-book');
const listBooks = require('./list-books');
const removeBook = require("./remove-book");
const { postBookSchema, listBookSchema, showBookSchema, patchBookSchema, deleteBookSchema } = require('./schemas');
const patchBook = require('./update-book');

const createBook = async (req, res) => {
  try {
    httpValidator({ body: req.body }, postBookSchema);

    const data = await addBook(req.body);

    res.json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};

const getBooks = async (req, res) => {
  try {
    httpValidator({ query: req.query }, listBookSchema);
    const data = await listBooks(req.query);

    res.json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};


const getBookById = async (req, res) => {
  try {
    httpValidator({ params: req.params }, showBookSchema);

    const data = await getBook(req.params);

    res.json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};

const updateBook = async (req, res) => {
  try {
    httpValidator({ body: req.body, params: req.params }, patchBookSchema);

    const data = await patchBook({ id: req.params.id, changes: req.body });

    res.status(201).json({
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error viev console' });
  }
};

const deleteBook = async (req, res) => {
  try {
    httpValidator({ params: req.params }, deleteBookSchema);

    await removeBook(req.params);

    res.json({
      message: "book deleted sucesffyle"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
    createBook,
    getBookById,
    getBooks,
    updateBook,
    deleteBook
};
