const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        address: req.body.address,
        phone: req.body.phone,
        username: req.body.username,
    });

    res.status(201).json({
        status: 'success',
        data: {
            userId: newUser._id,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    // 1. Check if username and password exist
    if (!username || !password) {
        return next(new AppError('Please provide username and password!', 400));
    }

    // 2. Check if user exists and password is correct
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
        return next(new AppError('Incorrect username or password!', 401));
    }

    // 3. If everything ok, send token to client
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        data: { token },
    });
});