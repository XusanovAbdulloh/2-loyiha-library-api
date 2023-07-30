const Book = require('./Book');

const createBook = async (req, res) => {
  try {
    const { title, publisher, author, copies } = req.body;
    const book = new Book({ title, publisher, author, copies });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBooks = async (req, res) => {
  try {
    const { q, sort, page, filters } = req.query;
    const searchQuery = q ? { title: { $regex: q, $options: 'i' } } : {};
    const sortQuery = sort ? { [sort.by]: sort.order === 'desc' ? -1 : 1 } : { copies: -1 };
    const limit = 10;
    const skip = (page - 1) * limit || 0;
    const filterQuery = filters && filters.is_deleted ? { is_deleted: true } : {};

    const books = await Book.find({ ...searchQuery, ...filterQuery })
      .sort(sortQuery)
      .limit(limit)
      .skip(skip)
      .populate('publisher')
      .populate('author');

    const totalBooks = await Book.countDocuments({ ...searchQuery, ...filterQuery });
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({ books, totalBooks, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('publisher').populate('author');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, publisher, author, copies } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.title = title;
    book.publisher = publisher;
    book.author = author;
    book.copies = copies;
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.is_deleted = true;
    await book.save();
    res.json({ message: 'Book deleted successfully' });
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
