const Chat = require('../models/Chat');
const { encrypt, decrypt } = require('../utils/encryption');

const sendMessage = async (senderId, recipientId, message) => {
  try {
    const encryptedMessage = encrypt(message);
    const newMessage = new Chat({
      sender: senderId,
      recipient: recipientId,
      message: encryptedMessage,
      timestamp: new Date(),
    });
    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error('Error sending message');
  }
};

const receiveMessages = async (userId) => {
  try {
    const messages = await Chat.find({
      $or: [{ sender: userId }, { recipient: userId }],
    }).sort({ timestamp: -1 });
    const decryptedMessages = messages.map((msg) => ({
      ...msg._doc,
      message: decrypt(msg.message),
    }));
    return decryptedMessages;
  } catch (error) {
    throw new Error('Error receiving messages');
  }
};

module.exports = {
  sendMessage,
  receiveMessages,
};
