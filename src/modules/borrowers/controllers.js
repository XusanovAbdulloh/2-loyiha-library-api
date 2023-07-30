const Borrower = require('./Borrower');

const createBorrower = async (req, res) => {
  const borrowerData = req.body;

  try {
    const newBorrower = await Borrower.create(borrowerData);
    res.json(newBorrower);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const getBorrowers = async (req, res) => {
    const { q, sort, page } = req.query;
    const perPage = 10;
    const currentPage = parseInt(page) || 1;
  
    let query = {};
  
    if (q) {
      query.$or = [
        { full_name: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
      ];
    }
  
    try {
      const totalCount = await Borrower.countDocuments(query);
      const totalPages = Math.ceil(totalCount / perPage);
  
      let sortOption = { full_name: -1 };
      if (sort) {
        if (sort === 'full_name') {
          sortOption = { full_name: 1 };
        } else if (sort === 'phone') {
          sortOption = { phone: 1 };
        }
      }
  
      const borrowers = await Borrower.find(query)
        .sort(sortOption)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
  
      res.json({ totalPages, currentPage, borrowers });
    } catch (err) {
      console.error(err);
      res.json({message: "error viev console"})
    }
  };


const getBorrowerById = async (req, res) => {
  const { id } = req.params;

  try {
    const borrower = await Borrower.findById(id);
    if (!borrower) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(borrower);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const updateBorrower = async (req, res) => {
  const { id } = req.params;
  const borrowerData = req.body;

  try {
    const updatedBorrower = await Borrower.findByIdAndUpdate(id, borrowerData, { new: true });
    if (!updatedBorrower) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(updatedBorrower);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"})
  }
};

const deleteBorrower = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBorrower = await Borrower.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
    if (!deletedBorrower) {
      return res.status(404).json({ message: 'not found' });
    }
    res.json(deletedBorrower);
  } catch (err) {
    console.error(err);
    res.json({message: "error viev console"}) 
  }
};

module.exports = {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
};
