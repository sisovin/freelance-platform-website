const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const socialController = require('../controllers/socialController');

// Create a new post
router.post('/posts', authMiddleware, socialController.createPost);

// Update a post
router.put('/posts/:id', authMiddleware, socialController.updatePost);

// Delete a post
router.delete('/posts/:id', authMiddleware, socialController.deletePost);

// Like a post
router.post('/posts/:id/like', authMiddleware, socialController.likePost);

// Comment on a post
router.post('/posts/:id/comment', authMiddleware, socialController.commentOnPost);

module.exports = router;
