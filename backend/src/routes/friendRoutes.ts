const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const friendController = require('../controllers/friendController');

// Route to send a friend request
router.post('/request', authMiddleware, friendController.sendFriendRequest);

// Route to accept a friend request
router.post('/accept', authMiddleware, friendController.acceptFriendRequest);

// Route to delete a friend request
router.delete('/request/:id', authMiddleware, friendController.deleteFriendRequest);

// Route to get all friends
router.get('/', authMiddleware, friendController.getAllFriends);

module.exports = router;
