const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication API', () => {
  let token;

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should generate a new JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/token')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should set up 2FA for a user', async () => {
    const res = await request(app)
      .post('/api/auth/2fa/setup')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'OTP sent to your email');
  });

  it('should verify 2FA for a user', async () => {
    const otp = await User.findOne({ email: 'testuser@example.com' }).then(user => user.otp);
    const res = await request(app)
      .post('/api/auth/2fa/verify')
      .set('Authorization', `Bearer ${token}`)
      .send({ otp });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', '2FA verified successfully');
  });
});
