import { Link } from "react-router-dom";

const VehicleRentalListing = ({ vehicle }) => {
  return (
    <div className="rental-preview">
      <h2>{vehicle.vehicleModel}</h2>

      <p>Category: {vehicle.category}</p>

      <p>Daily Price: €{Number(vehicle.dailyPrice).toFixed(2)}</p>

      <p>
        Status:{" "}
        {vehicle.availabilityStatus.charAt(0).toUpperCase() +
          vehicle.availabilityStatus.slice(1)}
      </p>

      <Link to={`/rentals/${vehicle._id}`}>
        View Details
      </Link>
    </div>
  );
};

export default VehicleRentalListing;