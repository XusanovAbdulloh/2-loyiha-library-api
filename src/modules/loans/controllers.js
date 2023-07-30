const Loan = require('./Loan');

const createLoan = async (req, res) => {
  try {
    const { book, borrower, out_date } = req.body;
    const admin = req.user.adminId;

    const totalLoans = await Loan.countDocuments({ borrower, returned: false });
    if (totalLoans >= 10) {
      return res.status(400).json({ message: 'limitga yetdi' });
    }

    const due_date = new Date(out_date);
    due_date.setMonth(due_date.getMonth() + 2);

    const loan = new Loan({ book, admin, borrower, out_date, due_date });
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getLoans = async (req, res) => {
  try {
    const { sort, page, filters } = req.query;
    const sortQuery = sort ? { [sort.by]: sort.order === 'desc' ? -1 : 1 } : { out_date: -1 };
    const limit = 10;
    const skip = (page - 1) * limit || 0;
    const filterQuery = {};
    if (filters) {
      if (filters.book) filterQuery.book = filters.book;
      if (filters.admin) filterQuery.admin = filters.admin;
    }

    const loans = await Loan.find(filterQuery)
      .sort(sortQuery)
      .limit(limit)
      .skip(skip)
      .populate({ path: 'book', populate: [{ path: 'author' }, { path: 'publisher' }] })
      .populate('admin')
      .populate('borrower');

    const totalLoans = await Loan.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalLoans / limit);

    res.json({ loans, totalLoans, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate({ path: 'book', populate: [{ path: 'author' }, { path: 'publisher' }] })
      .populate('admin')
      .populate('borrower');
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports= {
    createLoan,
    getLoanById,
    getLoans,
}