const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Post = require('../src/models/Post');
const User = require('../src/models/User');

let token;
let userId;
let postId;

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

  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'testuser@example.com', password: 'password123' });
  token = response.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await mongoose.connection.close();
});

describe('Social Networking Features', () => {
  test('Create a new post', async () => {
    const response = await request(app)
      .post('/api/social/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'This is a test post' });

    expect(response.status).toBe(201);
    expect(response.body.content).toBe('This is a test post');
    postId = response.body._id;
  });

  test('Update a post', async () => {
    const response = await request(app)
      .put(`/api/social/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'This is an updated test post' });

    expect(response.status).toBe(200);
    expect(response.body.content).toBe('This is an updated test post');
  });

  test('Delete a post', async () => {
    const response = await request(app)
      .delete(`/api/social/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted');
  });

  test('Like a post', async () => {
    const newPost = new Post({
      content: 'This is another test post',
      createdBy: userId,
    });
    await newPost.save();
    postId = newPost._id;

    const response = await request(app)
      .post(`/api/social/posts/${postId}/like`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.likes).toContain(userId.toString());
  });

  test('Comment on a post', async () => {
    const response = await request(app)
      .post(`/api/social/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${token}`)
      .send({ comment: 'This is a test comment' });

    expect(response.status).toBe(201);
    expect(response.body.comments[0].comment).toBe('This is a test comment');
  });
});
