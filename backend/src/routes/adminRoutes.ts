const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Admin routes
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

// User management routes
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

// Job management routes
router.get('/jobs', adminController.getAllJobs);
router.delete('/jobs/:id', adminController.deleteJob);

// Post management routes
router.get('/posts', adminController.getAllPosts);
router.delete('/posts/:id', adminController.deletePost);

module.exports = router;
