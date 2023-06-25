const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

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
        passwordChangedAt: req.body.passwordChangedAt
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

exports.protect = catchAsync(async (req, res, next) => {
    // 1. Get token and check if it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access'),
            401
        );
    }

    // 2. Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // 4. Check if user changed password after the token was issued
    if (currentUser.changePasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    next();
});