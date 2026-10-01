const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await VehicleRental.find({}).sort({ createdAt: -1 });
    res.status(200).json(vehicleRentals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle rentals' });
  }
};
// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  res.send("createVehicleRental");
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  const { vehicleRentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ message: 'Invalid vehicle rental id' });
  }

  try {
    const vehicleRental = await VehicleRental.findById(vehicleRentalId);
    if (!vehicleRental) {
      return res.status(404).json({ message: 'Vehicle rental not found' });
    }
    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle rental' });
  }
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  res.send("updateVehicleRental");
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  res.send("deleteVehicleRental");
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};

