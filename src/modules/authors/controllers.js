const addAuthor = require("./add-author");
const httpValidator = require("../../shared/http-validator/index")
const {postAuthorSchema, listAuthorSchema, showAuthorSchema, patchAuthorSchema, deleteAuthorSchema} = require("./schemas");
const listAuthors = require('./list-authors');
const getAuthor = require('./show-author');
const updateAuthorr = require('./update-author');
const removeAuthor = require("./delete-author")

const createAuthor = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postAuthorSchema);

    const result = await addAuthor(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.json({message: "error viev console"})
  }
};

const getAuthors = async (req, res) => {
  try {
    httpValidator({ query: req.query }, listAuthorSchema);
    const data = await listAuthors(req.query);
    res.json({data: data})
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const getAuthorById = async (req, res) => {
  try {
    httpValidator({ params: req.params }, showAuthorSchema);

    const author = await getAuthor(req.params);

    res.status(200).json({
      data: author,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const updateAuthor = async (req, res) => {
  try {
    httpValidator({ body: req.body, params: req.params }, patchAuthorSchema);

    const result = await updateAuthorr({ id: req.params.id, changes: req.body });

    res.status(201).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const deleteAuthor = async (req, res) => {
  try {
    httpValidator({ params: req.params }, deleteAuthorSchema);

    const result = await removeAuthor(req.params);

    res.status(201).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};


module.exports = {
    createAuthor,
    getAuthorById,
    getAuthors,
    updateAuthor,
    deleteAuthor
}