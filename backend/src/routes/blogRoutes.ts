const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Create a new blog post
router.post('/', authMiddleware, blogController.createBlogPost);

// Get all blog posts
router.get('/', blogController.getAllBlogPosts);

// Get a single blog post by ID
router.get('/:id', blogController.getBlogPostById);

// Update a blog post by ID
router.put('/:id', authMiddleware, blogController.updateBlogPost);

// Delete a blog post by ID
router.delete('/:id', authMiddleware, blogController.deleteBlogPost);

module.exports = router;
