const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await VehicleRental.find();
    res.status(200).json(vehicleRentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  try {
    const vehicleRental = await VehicleRental.create(req.body);

    res.status(201).json(vehicleRental);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  try {
    const vehicleRental = await VehicleRental.findById(
      req.params.vehicleRentalId
    );

    if (!vehicleRental) {
      return res.status(404).json({
        error: "Vehicle rental not found",
      });
    }

    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
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

