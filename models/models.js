const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  Author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  imageCollection: [String],
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  blogs: [BlogSchema],
  username: {
    type: String,
    require: true,
  },
  psswd: {
    type: String,
    require: true,
  },
});

const Blog = new mongoose.model("Blog", BlogSchema);
const User = new mongoose.model("User", UserSchema);

module.exports = { Blog, User };
