const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: String,
  description: String,
  images: [String],
  price: Number,
  productId: {
    type: String,
    required: [true, 'A product must have an ID!'],
    unique: true,
  },
  productName: {
    type: String,
    required: [true, 'A product must have a name!'],
  },
  rating: Number,
  sizes: [String],
  type: String,
  createdAt: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
