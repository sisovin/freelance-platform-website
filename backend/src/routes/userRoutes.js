const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Route to get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Route to update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Route to change password
router.put('/change-password', authMiddleware, userController.changePassword);

// Route to delete account
router.delete('/delete-account', authMiddleware, userController.deleteAccount);

module.exports = router;
