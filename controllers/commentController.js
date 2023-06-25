const Comment = require("../models/commentModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  const doc = await Comment.find();

  return res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findOne({
    commentId: req.params.id,
  });

  if (!doc) {
    return res.status(404).json({
      status: "error",
      message: "No comment found with that ID",
    });
  }

  return res.status(200).json({
    status: "success",
    data: doc,
  });
});
