const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// Route to send a message
router.post('/send', authMiddleware, chatController.sendMessage);

// Route to receive messages
router.get('/receive', authMiddleware, chatController.receiveMessages);

module.exports = router;
