const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please provide your address'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    validate: [validator.isMobilePhone, 'Please provide a valid phone number']
  },
  username: {
    type: String,
    required: [true, 'Please provide your username!'],
    unique: true,
  },
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;
