const { Blog, User } = require("../models/models");

const viewBlog = async (req, res) => {
  try {
    const response = await Blog.findById(res.params.blogId);
    if (!response.ok) {
      res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, author, content, createdAt, updatedAt, imageCollection } =
      req.body;
    const newData = new Blog({
      title,
      author,
      content,
      createdAt,
      updatedAt,
      imageCollection,
    });
    await newData.save();
    res.status(201).json({ data: newData, message: "Created Blog" });
  } catch (err) {
    res.status(400).json({ err: err, message: "Error" });
  }
};

const editBlog = async (req, res) => {
  try {
    const { title, author, content, createdAt, updatedAt, imageCollection } =
      req.body;
    const { userId, blogId } = req.params;
    const updatedData = new Blog({
      title,
      author,
      content,
      createdAt,
      updatedAt,
      imageCollection,
    });
    updatedData.updatedAt = Date.now();
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "user not found" });
      }
      const blog = user.blog.id(blogId);
      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
      }
      await Blog.findByIdAndUpdate(blogId, updatedData);
      res.status(201).json({ message: "Blog updated" });
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error("Error: ", err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { userId, blogId } = req.params;
    const { title, author, content, createdAt, updatedAt, imageCollection } =
      req.body;
    try {
      const user = await User.findById(userId);
      if (!user.ok) {
        res.status(404).json({ message: "user not found" });
      }
      const blog = user.blogs.id(blogId);
      if (!blog) {
        res.status(404).json({ message: "Blog not found" });
      }
      await Blog.findByIdAndDelete(blogId);
      res.status(200).json({ message: "Blog deleted" });
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { viewBlog, createBlog, editBlog, deleteBlog };
