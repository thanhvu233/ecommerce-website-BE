const OrderedItem = require('../models/orderedItemModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrderedItem = catchAsync(async (req, res) => {
  const doc = await OrderedItem.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

exports.getOrderedItem = catchAsync(async (req, res) => {
  const doc = await OrderedItem.find(req.query);

  if (!doc) {
    return res.status(200).json({
      status: 'success',
      data: undefined,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.updateOrderedItem = catchAsync(async (req, res, next) => {
  const doc = await OrderedItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.getUnpaidItems = catchAsync(async (req, res) => {
  const doc = await OrderedItem.find({
    status: 'pending',
    user: req.user.id,
  });

  if (!doc) {
    return res.status(200).json({
      status: 'success',
      data: [],
    });
  }

  return res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.deleteOrderedItem = catchAsync(async (req, res, next) => {
  const doc = await OrderedItem.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No ordered items found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateOrderedItems = catchAsync(async (req, res, next) => {
  const doc = await OrderedItem.updateMany(
    {
      order: req.body.id,
      user: req.user.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!doc) {
    return next(new AppError('No ordered item found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});
