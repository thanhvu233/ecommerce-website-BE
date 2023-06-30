const OrderedItem = require('../models/orderedItemModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOrderedItem = catchAsync(async (req, res, next) => {
    const doc = await OrderedItem.create(req.body);

    res.status(201).json({
        status: 'success',
        data: doc
    });
});

exports.getOrderedItem = catchAsync(async (req, res, next) => {
    const doc = await OrderedItem.find(req.query);

    if (!doc) {
        return res.status(200).json({
            status: "success",
            data: undefined,
        });
    }

    return res.status(200).json({
        status: "success",
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

exports.getUnpaidItems = catchAsync(async (req, res, next) => {
    const doc = await OrderedItem.find({
        paid: false
    });

    if (!doc) {
        return res.status(200).json({
            status: "success",
            data: [],
        });
    }

    return res.status(200).json({
        status: "success",
        data: doc,
    });
}); 