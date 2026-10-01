import { useEffect, useState } from "react";
import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicleRentals");

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle rentals");
        }

        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVehicles();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="rental-list">
      {vehicles.map((vehicle) => (
        <VehicleRentalListing
          key={vehicle._id}
          vehicle={vehicle}
        />
      ))}
    </div>
  );
};

export default VehicleRentalListings;