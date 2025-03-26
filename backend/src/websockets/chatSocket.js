const socketIO = require('socket.io');
const ChatService = require('../services/chatService');

const chatSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async (data) => {
      try {
        const { senderId, recipientId, message } = data;
        const newMessage = await ChatService.sendMessage(senderId, recipientId, message);
        io.to(recipientId).emit('receiveMessage', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = chatSocket;
