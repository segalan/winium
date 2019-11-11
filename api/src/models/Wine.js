const mongoose = require('mongoose');

const Wine = mongoose.Schema({
  country: { type: String, required: true },
  designation: { type: String, required: true },
  province: { type: String, required: true },
  region_1: String,
  region_2: String,
  variety: { type: String, required: true },
  winery: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('wine', Wine);
