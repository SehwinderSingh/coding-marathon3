const express = require('express');
const router = express.Router();
const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');



// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);

router.get('/:vehicleRentalId', getVehicleRentalById);

const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, createVehicleRental);
router.put('/:vehicleRentalId', requireAuth, updateVehicleRental);
router.delete('/:vehicleRentalId', requireAuth, deleteVehicleRental);


module.exports = router;

