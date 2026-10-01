import { Link } from "react-router-dom";

const VehicleRentalListing = ({ rental }) => {
  return (
    <div className="rental-preview">
      <h2>{rental.vehicleModel}</h2>

      <p>Category: {rental.category}</p>
      <p>Description: {rental.description}</p>

      <p>Agency: {rental.agency?.name}</p>

      <p>
        Location: {rental.location?.city}, {rental.location?.state}
      </p>

      <p>Daily Price: €{rental.dailyPrice}</p>
      <p>Status: {rental.availabilityStatus}</p>

      <Link to={`/rental/${rental._id}`}>
        View Details
      </Link>
    </div>
  );
};

export default VehicleRentalListing;