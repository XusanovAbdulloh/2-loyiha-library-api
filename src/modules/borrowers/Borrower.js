const mongoose = require('mongoose');

const BorrowerSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  is_deleted: { type: Boolean, default: false },
});

const Borrower = mongoose.model('Borrower', BorrowerSchema);
module.exports = Borrower;
