const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_super: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;