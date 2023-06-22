const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  username: {
    type: String,
  },
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;
