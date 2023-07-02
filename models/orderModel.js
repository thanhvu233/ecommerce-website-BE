const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user!'],
  },
  total: {
    type: Number,
    required: [true, 'Order must have total.'],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'checkout', 'deliver'],
      message: 'Status is either: pending, checkout, deliver',
    },
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ['cod', 'credit-card'],
      message: 'Payment method is either: cod, credit-card',
    },
    default: 'cod',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
