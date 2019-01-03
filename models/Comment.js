const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  date: Date,
  author: String,
  description: String,
});

module.exports = Comment = mongoose.model('comment', CommentSchema)
