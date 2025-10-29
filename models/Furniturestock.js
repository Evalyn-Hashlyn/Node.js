const mongoose = require('mongoose');

const furniturestockSchema = new mongoose.Schema({
  furnitureType: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  material: {
    type: String,
  },
  furnitureImage: {
    type: String,
  }
});

module.exports = mongoose.model('Furniture', furniturestockSchema);