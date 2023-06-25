const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
