const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const config = require('../utils/config');
const User = require('../models/userModel');

const api = supertest(app);

const validUser = {
  name: 'Matti Meikäläinen',
  username: 'matti',
  password: 'Secret123!',
  phone_number: '+358401234567',
  licenseNumber: 'FI-123456',
  date_of_birth: '1995-05-15',
  address: {
    licenseExpiryDate: '2030-12-31',
    city: 'Helsinki',
    yearsOfExperience: 8,
  },
};

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI);
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/signup', () => {
  it('creates a user and returns a token', async () => {
    const response = await api
      .post('/api/auth/signup')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.username).toBe('matti');
    expect(response.body.token).toBeDefined();

    const users = await User.find({});
    expect(users).toHaveLength(1);
  });

  it('stores a hashed password, not the plain text', async () => {
    await api.post('/api/auth/signup').send(validUser).expect(201);
    const user = await User.findOne({ username: 'matti' });
    expect(user.password).not.toBe(validUser.password);
  });

  it('does not return the password', async () => {
    const response = await api.post('/api/auth/signup').send(validUser).expect(201);
    expect(response.body.password).toBeUndefined();
  });

  it('returns 400 when the username is already taken', async () => {
    await api.post('/api/auth/signup').send(validUser).expect(201);
    await api
      .post('/api/auth/signup')
      .send({ ...validUser, licenseNumber: 'FI-999999' })
      .expect(400);

    const users = await User.find({});
    expect(users).toHaveLength(1);
  });

  it('returns 400 when the license number is already taken', async () => {
    await api.post('/api/auth/signup').send(validUser).expect(201);
    await api
      .post('/api/auth/signup')
      .send({ ...validUser, username: 'otheruser' })
      .expect(400);
  });

  it('returns 400 when a required field is missing', async () => {
    const { password, ...withoutPassword } = validUser;
    await api.post('/api/auth/signup').send(withoutPassword).expect(400);
  });

  it('returns 400 when address fields are missing', async () => {
    await api
      .post('/api/auth/signup')
      .send({ ...validUser, address: { city: 'Helsinki' } })
      .expect(400);
  });

  it('returns 400 for an empty body', async () => {
    await api.post('/api/auth/signup').send({}).expect(400);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await api.post('/api/auth/signup').send(validUser).expect(201);
  });

  it('logs in with correct credentials and returns a token', async () => {
    const response = await api
      .post('/api/auth/login')
      .send({ username: 'matti', password: 'Secret123!' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.username).toBe('matti');
    expect(response.body.token).toBeDefined();
  });

  it('returns 401 for a wrong password', async () => {
    await api
      .post('/api/auth/login')
      .send({ username: 'matti', password: 'wrongpassword' })
      .expect(401);
  });

  it('returns 401 for a user that does not exist', async () => {
    await api
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'Secret123!' })
      .expect(401);
  });

  it('returns 400 when username or password is missing', async () => {
    await api.post('/api/auth/login').send({ username: 'matti' }).expect(400);
    await api.post('/api/auth/login').send({ password: 'Secret123!' }).expect(400);
  });
});