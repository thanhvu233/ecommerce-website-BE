const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');
const commentRouter = require('./routes/commentRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const orderedItemRouter = require('./routes/orderedItemRoutes');
const checkoutRouter = require('./routes/checkoutRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

const app = express();

app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/order-items', orderedItemRouter);
app.use('/api/v1/checkout', checkoutRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
