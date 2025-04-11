const Blog = require('../models/Blog');

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlogPost = new Blog({
      title,
      content,
      createdBy: req.user.id
    });
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find().populate('createdBy', 'username');
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await Blog.findById(req.params.id).populate('createdBy', 'username');
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
};

// Update a blog post by ID
const updateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error });
  }
};

// Delete a blog post by ID
const deleteBlogPost = async (req, res) => {
  try {
    const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};
