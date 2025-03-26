const ChatService = require('../services/chatService');

const sendMessage = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user.id;
    const newMessage = await ChatService.sendMessage(senderId, recipientId, message);
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

const receiveMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await ChatService.receiveMessages(userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error receiving messages', error });
  }
};

module.exports = {
  sendMessage,
  receiveMessages,
};
