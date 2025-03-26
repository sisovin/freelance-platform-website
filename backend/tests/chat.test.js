const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Chat = require('../src/models/Chat');
const User = require('../src/models/User');
const { encrypt } = require('../src/utils/encryption');

describe('Chat API', () => {
  let token;
  let userId;
  let recipientId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    await user.save();
    userId = user._id;

    const recipient = new User({
      username: 'recipientuser',
      email: 'recipientuser@example.com',
      password: 'password123',
    });
    await recipient.save();
    recipientId = recipient._id;

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' });
    token = response.body.token;
  });

  afterAll(async () => {
    await Chat.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/chat/send', () => {
    it('should send a message', async () => {
      const message = 'Hello, this is a test message';
      const response = await request(app)
        .post('/api/chat/send')
        .set('Authorization', `Bearer ${token}`)
        .send({ recipientId, message });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(encrypt(message).encryptedData);
    });
  });

  describe('GET /api/chat/receive', () => {
    it('should receive messages', async () => {
      const response = await request(app)
        .get('/api/chat/receive')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
