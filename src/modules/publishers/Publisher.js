const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  is_deleted: { type: Boolean, default: false },
});

const Publisher = mongoose.model('Publisher', PublisherSchema);
module.exports = Publisher;