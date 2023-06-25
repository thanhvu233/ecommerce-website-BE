const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  excludedFields = ["_page", "sort", "_limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne)\b/g, (match) => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-productName");
  }

  // Pagination
  const page = req.query["_page"] * 1 || 1;
  const limit = req.query["_limit"] * 1 || 50;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    if (skip >= req.totalRow) throw new Error("This page does not exist");
  }

  // EXECUTE QUERY
  const products = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    totalRow: req.totalRow,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const doc = await Product.findOne({
    productId: req.params.id,
  });

  if (!doc) {
    return next(new AppError('No product found with that ID', 404));
  }

  return res.status(200).json({
    status: "success",
    data: doc,
  });
});

exports.getFeatureProducts = (req, res, next) => {
  req.query["_limit"] = "4";
  req.query["_page"] = "1";
  req.query.category = "shirt";
  req.query.type = { $in: ["men", "women"] };
  next();
};

exports.getLatestProducts = (req, res, next) => {
  req.query["_limit"] = "8";
  req.query["_page"] = "1";
  req.query.category = "shirt";
  req.query.type = { $in: ["men", "women"] };
  req.query.sort = "-createdAt";
  next();
};

exports.getSignatureProduct = (req, res, next) => {
  req.params.id = "2e5b5a37-6e52-4263-87d4-c8c84aab8cb8";
  next();
};

exports.getProductCount = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  excludedFields = ["_page", "sort", "_limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne)\b/g, (match) => `$${match}`);

  const total = await Product.countDocuments(JSON.parse(queryStr));

  console.log(total);

  req.totalRow = total;

  next();
});
