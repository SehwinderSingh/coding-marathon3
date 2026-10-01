import { useEffect, useState } from "react";
import VehicleRentalListing from "./VehicleRentalListing";
import { getVehicleRentals } from "../services/vehicleRentalApi";

const VehicleRentalListings = () => {
  const [vehicleRentals, setVehicleRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleRentals = async () => {
      try {
        const data = await getVehicleRentals();
        setVehicleRentals(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleRentals();
  }, []);

  if (isLoading) {
    return <p>Loading vehicle rentals...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="rental-list">
      {vehicleRentals.map((rental) => (
        <VehicleRentalListing
          key={rental._id}
          rental={rental}
        />
      ))}
    </div>
  );
};

export default VehicleRentalListings;