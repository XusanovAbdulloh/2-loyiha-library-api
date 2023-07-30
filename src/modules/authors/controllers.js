const express = require('express');
const Author = require('./Author');
const { BadRequestError, NotFoundError } = require("../../shared/errors")


const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const author = new Author({ name });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};


const getAuthors = async (req, res) => {
  try {
    const { q, sort, page, filters } = req.query;
    const searchQuery = q ? { name: { $regex: q, $options: 'i' } } : {};
    const sortQuery = sort ? { [sort.by]: sort.order === 'desc' ? -1 : 1 } : { name: 1 };
    const limit = 10;
    const skip = (page - 1) * limit || 0;
    const filterQuery = filters && filters.is_deleted ? { is_deleted: true } : {};

    const authors = await Author.find({ ...searchQuery, ...filterQuery })
      .sort(sortQuery)
      .limit(limit)
      .skip(skip);

    const totalAuthors = await Author.countDocuments({ ...searchQuery, ...filterQuery });
    const totalPages = Math.ceil(totalAuthors / limit);

    res.json({ authors, totalAuthors, totalPages });
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(author);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'not found' });
    }
    author.name = name;
    await author.save();
    res.json(author);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'not found' });
    }
    author.is_deleted = true;
    await author.save();
    res.json({ message: 'Author deleted successfully' });
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