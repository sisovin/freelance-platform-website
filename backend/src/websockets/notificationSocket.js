const socketIO = require('socket.io');
const NotificationService = require('../services/notificationService');

const notificationSocket = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('New client connected for notifications');

    socket.on('sendNotification', async (data) => {
      try {
        const { recipientId, notification } = data;
        const newNotification = await NotificationService.sendNotification(recipientId, notification);
        io.to(recipientId).emit('receiveNotification', newNotification);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected from notifications');
    });
  });
};

module.exports = notificationSocket;
