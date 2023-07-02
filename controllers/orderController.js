const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.create({
    user: req.user.id,
    createdAt: req.body.createdAt,
    total: req.body.total,
  });

  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No orders found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
