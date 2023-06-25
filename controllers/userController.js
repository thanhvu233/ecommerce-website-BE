const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...disallowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (!disallowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;

    next();
};

exports.getUser = catchAsync(async (req, res, next) => {
    const doc = await User.findById(req.params.id);

    if (!doc) {
        return next(new AppError('No user found with that ID', 404));
    }

    return res.status(200).json({
        status: "success",
        data: doc,
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1. Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2. Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'username');

    // 3. Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});