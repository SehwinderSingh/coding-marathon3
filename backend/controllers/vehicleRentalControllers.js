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
  try {
    const newVehicleRental = await VehicleRental(req.body);
    res.status(201).json(newVehicleRental);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create vehicle rental', error: error.message });
  }
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
  const { vehicleRentalId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ message: 'Invalid vehicle rental id' });
  }

  try {
    const updatedVehicleRental = await VehicleRental.findByIdAndUpdate({_id: vehicleRentalId}, {...req.body}, { returnDocument: 'after', runValidators: true });
    if (!updatedVehicleRental) {
      return res.status(404).json({ message: 'Vehicle rental not found' });
    }
    res.status(200).json(updatedVehicleRental);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update vehicle rental', error: error.message });
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ message: 'Invalid vehicle rental id' });
  }

  try {
    const deletedVehicleRental = await VehicleRental.findByIdAndDelete({_id: vehicleRentalId});
    if (!deletedVehicleRental) {
      return res.status(404).json({ message: 'Vehicle rental not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete vehicle rental', error: error.message });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};

