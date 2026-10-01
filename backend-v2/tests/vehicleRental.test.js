const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const config = require('../utils/config');
const VehicleRental = require('../models/vehicleRentalModel');
const User = require('../models/userModel');

const api = supertest(app);

const vehicleRentals = [
  {
    vehicleModel: 'Toyota Corolla 2024',
    category: 'Sedan',
    description: 'Reliable and fuel-efficient compact sedan.',
    agency: { name: 'City Wheels', contactEmail: 'info@citywheels.com', fleetSize: 120 },
    location: { city: 'Helsinki', state: 'Uusimaa' },
    dailyPrice: 45,
    availabilityStatus: 'available',
    bookingDeadline: '2026-12-31',
    insurancePolicy: 'Full coverage included',
  },
  {
    vehicleModel: 'Ford Transit',
    category: 'Van',
    description: 'Spacious cargo van for moving and deliveries.',
    agency: { name: 'MoveIt Rentals', contactEmail: 'contact@moveit.com', fleetSize: 40 },
    location: { city: 'Espoo', state: 'Uusimaa' },
    dailyPrice: 80,
    availabilityStatus: 'rented',
    insurancePolicy: 'Basic liability',
  },
];

const newRental = {
  vehicleModel: 'Tesla Model 3',
  category: 'Electric',
  description: 'Long-range electric sedan.',
  agency: { name: 'Green Drive', contactEmail: 'hello@greendrive.com', fleetSize: 25 },
  location: { city: 'Tampere', state: 'Pirkanmaa' },
  dailyPrice: 110,
  insurancePolicy: 'Premium coverage',
};

const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'Secret123!',
  phone_number: '+358401111111',
  licenseNumber: 'FI-TEST-001',
  date_of_birth: '1990-01-01',
  address: {
    licenseExpiryDate: '2030-01-01',
    city: 'Helsinki',
    yearsOfExperience: 10,
  },
};

let token = null;
const nonExistingId = () => new mongoose.Types.ObjectId().toString();

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI);
  await User.deleteMany({});
  const response = await api.post('/api/auth/signup').send(testUser);
  token = response.body.token;
});

beforeEach(async () => {
  await VehicleRental.deleteMany({});
  await VehicleRental.insertMany(vehicleRentals);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/vehicleRentals (public)', () => {
  it('returns all vehicle rentals without a token', async () => {
    const response = await api
      .get('/api/vehicleRentals')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(vehicleRentals.length);
  });

  it('returns an empty array when there are no rentals', async () => {
    await VehicleRental.deleteMany({});
    const response = await api.get('/api/vehicleRentals').expect(200);
    expect(response.body).toEqual([]);
  });
});

describe('GET /api/vehicleRentals/:id (public)', () => {
  it('returns one vehicle rental without a token', async () => {
    const rental = await VehicleRental.findOne({ vehicleModel: 'Ford Transit' });
    const response = await api.get(`/api/vehicleRentals/${rental._id}`).expect(200);
    expect(response.body.vehicleModel).toBe('Ford Transit');
  });

  it('returns 404 for a non-existing id', async () => {
    await api.get(`/api/vehicleRentals/${nonExistingId()}`).expect(404);
  });

  it('returns 400 for an invalid id', async () => {
    await api.get('/api/vehicleRentals/12345').expect(400);
  });
});

describe('POST /api/vehicleRentals (protected)', () => {
  it('creates a rental with a valid token', async () => {
    const response = await api
      .post('/api/vehicleRentals')
      .set('Authorization', `Bearer ${token}`)
      .send(newRental)
      .expect(201);

    expect(response.body.vehicleModel).toBe('Tesla Model 3');
    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length + 1);
  });

  it('returns 401 without a token', async () => {
    await api.post('/api/vehicleRentals').send(newRental).expect(401);
    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length);
  });

  it('returns 401 with an invalid token', async () => {
    await api
      .post('/api/vehicleRentals')
      .set('Authorization', 'Bearer invalidtoken123')
      .send(newRental)
      .expect(401);
  });

  it('returns 401 when the header is not a Bearer token', async () => {
    await api
      .post('/api/vehicleRentals')
      .set('Authorization', token)
      .send(newRental)
      .expect(401);
  });

  it('returns 400 when a required field is missing (with token)', async () => {
    const { vehicleModel, ...withoutModel } = newRental;
    await api
      .post('/api/vehicleRentals')
      .set('Authorization', `Bearer ${token}`)
      .send(withoutModel)
      .expect(400);
  });

  it('returns 400 for an invalid availabilityStatus (with token)', async () => {
    await api
      .post('/api/vehicleRentals')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...newRental, availabilityStatus: 'stolen' })
      .expect(400);
  });
});

describe('PUT /api/vehicleRentals/:id (protected)', () => {
  it('updates a rental with a valid token', async () => {
    const rental = await VehicleRental.findOne({ vehicleModel: 'Toyota Corolla 2024' });
    const response = await api
      .put(`/api/vehicleRentals/${rental._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ dailyPrice: 55, availabilityStatus: 'maintenance' })
      .expect(200);

    expect(response.body.dailyPrice).toBe(55);
    expect(response.body.availabilityStatus).toBe('maintenance');
  });

  it('returns 401 without a token and does not change the rental', async () => {
    const rental = await VehicleRental.findOne({ vehicleModel: 'Toyota Corolla 2024' });
    await api
      .put(`/api/vehicleRentals/${rental._id}`)
      .send({ dailyPrice: 999 })
      .expect(401);

    const unchanged = await VehicleRental.findById(rental._id);
    expect(unchanged.dailyPrice).toBe(45);
  });

  it('returns 404 for a non-existing id (with token)', async () => {
    await api
      .put(`/api/vehicleRentals/${nonExistingId()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ dailyPrice: 60 })
      .expect(404);
  });

  it('returns 400 for an invalid id (with token)', async () => {
    await api
      .put('/api/vehicleRentals/12345')
      .set('Authorization', `Bearer ${token}`)
      .send({ dailyPrice: 60 })
      .expect(400);
  });
});

describe('DELETE /api/vehicleRentals/:id (protected)', () => {
  it('deletes a rental with a valid token', async () => {
    const rental = await VehicleRental.findOne({});
    await api
      .delete(`/api/vehicleRentals/${rental._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length - 1);
  });

  it('returns 401 without a token and does not delete', async () => {
    const rental = await VehicleRental.findOne({});
    await api.delete(`/api/vehicleRentals/${rental._id}`).expect(401);

    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length);
  });

  it('returns 404 for a non-existing id (with token)', async () => {
    await api
      .delete(`/api/vehicleRentals/${nonExistingId()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});