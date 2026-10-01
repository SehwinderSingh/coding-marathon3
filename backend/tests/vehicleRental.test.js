const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const config = require('../utils/config');
const VehicleRental = require('../models/vehicleRentalModel');

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

const nonExistingId = () => new mongoose.Types.ObjectId().toString();

beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI);
});

beforeEach(async () => {
  await VehicleRental.deleteMany({});
  await VehicleRental.insertMany(vehicleRentals);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/vehicleRentals', () => {
  it('returns all vehicle rentals as JSON', async () => {
    const response = await api
      .get('/api/vehicleRentals')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(vehicleRentals.length);
  });

  it('returns documents with an id field', async () => {
    const response = await api.get('/api/vehicleRentals').expect(200);
    expect(response.body[0].id).toBeDefined();
  });

  it('returns an empty array when there are no rentals', async () => {
    await VehicleRental.deleteMany({});
    const response = await api.get('/api/vehicleRentals').expect(200);
    expect(response.body).toEqual([]);
  });
});

describe('GET /api/vehicleRentals/:id', () => {
  it('returns one vehicle rental for a valid id', async () => {
    const rental = await VehicleRental.findOne({ vehicleModel: 'Ford Transit' });

    const response = await api
      .get(`/api/vehicleRentals/${rental._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.vehicleModel).toBe('Ford Transit');
    expect(response.body.agency.name).toBe('MoveIt Rentals');
  });

  it('returns 404 for a non-existing id', async () => {
    await api.get(`/api/vehicleRentals/${nonExistingId()}`).expect(404);
  });

  it('returns 400 for an invalid id', async () => {
    await api.get('/api/vehicleRentals/12345').expect(400);
  });
});

describe('POST /api/vehicleRentals', () => {
  const newRental = {
    vehicleModel: 'Tesla Model 3',
    category: 'Electric',
    description: 'Long-range electric sedan.',
    agency: { name: 'Green Drive', contactEmail: 'hello@greendrive.com', fleetSize: 25 },
    location: { city: 'Tampere', state: 'Pirkanmaa' },
    dailyPrice: 110,
    insurancePolicy: 'Premium coverage',
  };

  it('creates a new vehicle rental with valid data', async () => {
    const response = await api
      .post('/api/vehicleRentals')
      .send(newRental)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.vehicleModel).toBe(newRental.vehicleModel);
    expect(response.body.location.city).toBe('Tampere');

    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length + 1);
  });

  it('applies default values for availabilityStatus and listingDate', async () => {
    const response = await api.post('/api/vehicleRentals').send(newRental).expect(201);
    expect(response.body.availabilityStatus).toBe('available');
    expect(response.body.listingDate).toBeDefined();
  });

  it('returns 400 when a required field is missing', async () => {
    const { vehicleModel, ...withoutModel } = newRental;
    await api.post('/api/vehicleRentals').send(withoutModel).expect(400);

    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length);
  });

  it('returns 400 when a nested required field is missing', async () => {
    const invalid = { ...newRental, agency: { name: 'No Email Agency' } };
    await api.post('/api/vehicleRentals').send(invalid).expect(400);
  });

  it('returns 400 for an invalid availabilityStatus', async () => {
    const invalid = { ...newRental, availabilityStatus: 'stolen' };
    await api.post('/api/vehicleRentals').send(invalid).expect(400);
  });

  it('returns 400 when dailyPrice is not a number', async () => {
    const invalid = { ...newRental, dailyPrice: 'cheap' };
    await api.post('/api/vehicleRentals').send(invalid).expect(400);
  });

  it('returns 400 for an empty body', async () => {
    await api.post('/api/vehicleRentals').send({}).expect(400);
  });
});

describe('PUT /api/vehicleRentals/:id', () => {
  it('updates a vehicle rental with valid data', async () => {
    const rental = await VehicleRental.findOne({ vehicleModel: 'Toyota Corolla 2024' });
    const updates = { dailyPrice: 55, availabilityStatus: 'maintenance' };

    const response = await api
      .put(`/api/vehicleRentals/${rental._id}`)
      .send(updates)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.dailyPrice).toBe(55);
    expect(response.body.availabilityStatus).toBe('maintenance');

    const updatedInDb = await VehicleRental.findById(rental._id);
    expect(updatedInDb.dailyPrice).toBe(55);
  });

  it('returns 400 for an invalid enum value', async () => {
    const rental = await VehicleRental.findOne({});
    await api
      .put(`/api/vehicleRentals/${rental._id}`)
      .send({ availabilityStatus: 'stolen' })
      .expect(400);
  });

  it('returns 404 for a non-existing id', async () => {
    await api
      .put(`/api/vehicleRentals/${nonExistingId()}`)
      .send({ dailyPrice: 60 })
      .expect(404);
  });

  it('returns 400 for an invalid id', async () => {
    await api.put('/api/vehicleRentals/12345').send({ dailyPrice: 60 }).expect(400);
  });
});

describe('DELETE /api/vehicleRentals/:id', () => {
  it('deletes a vehicle rental and returns 204', async () => {
    const rental = await VehicleRental.findOne({});
    await api.delete(`/api/vehicleRentals/${rental._id}`).expect(204);

    const all = await VehicleRental.find({});
    expect(all).toHaveLength(vehicleRentals.length - 1);
    expect(await VehicleRental.findById(rental._id)).toBeNull();
  });

  it('returns 404 for a non-existing id', async () => {
    await api.delete(`/api/vehicleRentals/${nonExistingId()}`).expect(404);
  });

  it('returns 400 for an invalid id', async () => {
    await api.delete('/api/vehicleRentals/12345').expect(400);
  });
});

describe('Unknown endpoints', () => {
  it('returns 404 for an unknown route', async () => {
    await api.get('/api/doesNotExist').expect(404);
  });
});