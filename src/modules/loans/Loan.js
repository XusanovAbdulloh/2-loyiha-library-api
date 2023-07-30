const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  out_date: { type: Date, default: Date.now },
  due_date: { type: Date },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
});

const Loan = mongoose.model('Loan', LoanSchema);
module.exports = Loan;