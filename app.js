const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes')
const commentRouter = require('./routes/commentRoutes')
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

module.exports = app;
