import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const VehicleRentalPage = () => {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`/api/vehicleRentals/${id}`);

        if (!response.ok) {
          throw new Error("Vehicle rental not found");
        }

        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVehicle();
  }, [id]);

  if (error) {
    return (
      <div className="rental-preview">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/">Back to vehicles</Link>
      </div>
    );
  }

  if (!vehicle) {
    return <p>Loading vehicle rental...</p>;
  }

  return (
    <div className="rental-preview">
      <h2>{vehicle.vehicleModel}</h2>

      <p><strong>Category:</strong> {vehicle.category}</p>
      <p><strong>Description:</strong> {vehicle.description}</p>

      <h3>Agency</h3>
      <p><strong>Name:</strong> {vehicle.agency?.name}</p>
      <p><strong>Email:</strong> {vehicle.agency?.contactEmail}</p>
      <p><strong>Fleet Size:</strong> {vehicle.agency?.fleetSize}</p>

      <h3>Location</h3>
      <p><strong>City:</strong> {vehicle.location?.city}</p>
      <p><strong>State:</strong> {vehicle.location?.state}</p>

      <p><strong>Daily Price:</strong> €{vehicle.dailyPrice}</p>
      <p><strong>Availability:</strong> {vehicle.availabilityStatus}</p>

      <p>
        <strong>Listing Date:</strong>{" "}
        {vehicle.listingDate
          ? new Date(vehicle.listingDate).toLocaleDateString()
          : "Not available"}
      </p>

      <p>
        <strong>Booking Deadline:</strong>{" "}
        {vehicle.bookingDeadline
          ? new Date(vehicle.bookingDeadline).toLocaleDateString()
          : "No deadline"}
      </p>

      <p><strong>Insurance Policy:</strong> {vehicle.insurancePolicy}</p>

      <Link to="/">Back to vehicles</Link>
    </div>
  );
};

export default VehicleRentalPage;