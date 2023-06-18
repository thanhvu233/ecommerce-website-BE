const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

console.log(DB)

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  }).catch(err => console.log(err));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});