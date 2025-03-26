const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Job = require('../src/models/Job');
const User = require('../src/models/User');

describe('Job Posting and Applications', () => {
  let token;
  let jobId;

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a test user and get a JWT token
    const userResponse = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    token = userResponse.body.token;
  });

  afterAll(async () => {
    // Clean up the test database
    await Job.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test('should create a new job posting', async () => {
    const response = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Job',
        description: 'This is a test job',
        location: 'Remote',
        salary: 50000,
        deadline: '2023-12-31',
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Job');
    jobId = response.body._id;
  });

  test('should update an existing job posting', async () => {
    const response = await request(app)
      .put(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Job',
        description: 'This is an updated test job',
        location: 'Remote',
        salary: 60000,
        deadline: '2023-12-31',
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Test Job');
  });

  test('should delete a job posting', async () => {
    const response = await request(app)
      .delete(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Job deleted successfully');
  });

  test('should get all job postings', async () => {
    const response = await request(app).get('/api/jobs');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should get a specific job posting by ID', async () => {
    const jobResponse = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Another Test Job',
        description: 'This is another test job',
        location: 'Remote',
        salary: 70000,
        deadline: '2023-12-31',
      });

    const response = await request(app).get(`/api/jobs/${jobResponse.body._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Another Test Job');
  });
});
