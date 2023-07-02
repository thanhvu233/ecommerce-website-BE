const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllComments = catchAsync(async (req, res, next) => {
  const doc = await Comment.find();

  return res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findOne({
    commentId: req.params.id,
  });

  if (!doc) {
    return next(new AppError('No comment found with that ID', 404));
  }

  return res.status(200).json({
    status: 'success',
    data: doc,
  });
});
