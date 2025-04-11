const Blog = require('../models/Blog');

// Create a new blog post
const createBlogPost = async (title, content, userId) => {
  try {
    const newBlogPost = new Blog({
      title,
      content,
      createdBy: userId
    });
    const savedBlogPost = await newBlogPost.save();
    return savedBlogPost;
  } catch (error) {
    throw new Error('Error creating blog post');
  }
};

// Get all blog posts
const getAllBlogPosts = async () => {
  try {
    const blogPosts = await Blog.find().populate('createdBy', 'username');
    return blogPosts;
  } catch (error) {
    throw new Error('Error fetching blog posts');
  }
};

// Get a single blog post by ID
const getBlogPostById = async (id) => {
  try {
    const blogPost = await Blog.findById(id).populate('createdBy', 'username');
    if (!blogPost) {
      throw new Error('Blog post not found');
    }
    return blogPost;
  } catch (error) {
    throw new Error('Error fetching blog post');
  }
};

// Update a blog post by ID
const updateBlogPost = async (id, title, content) => {
  try {
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedBlogPost) {
      throw new Error('Blog post not found');
    }
    return updatedBlogPost;
  } catch (error) {
    throw new Error('Error updating blog post');
  }
};

// Delete a blog post by ID
const deleteBlogPost = async (id) => {
  try {
    const deletedBlogPost = await Blog.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      throw new Error('Blog post not found');
    }
    return { message: 'Blog post deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting blog post');
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};
