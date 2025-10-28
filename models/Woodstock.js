const mongoose = require('mongoose');

const woodstockSchema = new mongoose.Schema({
  woodType: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  supplier: {
    type: String,
    trim: true,
  },
  dateReceived: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Wood', woodstockSchema);