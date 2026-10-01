import React, { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicleRentalApi';
import VehicleRentalListing from './VehicleRentalListing';

const VehicleRentalListings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="vehicle-listings-grid">
      {vehicles.map((vehicle) => (
        <VehicleRentalListing key={vehicle._id || vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleRentalListings;