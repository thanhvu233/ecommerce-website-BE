const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  avatar: String,
  detail: String,
  commentId: {
    type: String,
    required: [true, 'A product must have an ID!'],
    unique: true,
  },
  rating: Number,
  productName: {
    type: String,
    required: [true, 'A product must have a name!'],
  },
  userId: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
