import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('en-GB') : '-';

const VehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);
        if (!res.ok) throw new Error('Failed to fetch vehicle rental');
        const data = await res.json();
        setRental(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this vehicle rental?')) return;
    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete vehicle rental');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!rental) return <p>Vehicle rental not found</p>;

  return (
    <div className="rental-details">
      <h2>{rental.vehicleModel}</h2>
      <p><strong>Category:</strong> {rental.category}</p>
      <p><strong>Description:</strong> {rental.description}</p>

      <h3>Agency</h3>
      <p><strong>Name:</strong> {rental.agency?.name}</p>
      <p><strong>Email:</strong> {rental.agency?.contactEmail}</p>
      <p><strong>Fleet Size:</strong> {rental.agency?.fleetSize ?? '-'}</p>

      <h3>Location</h3>
      <p><strong>City:</strong> {rental.location?.city}</p>
      <p><strong>State:</strong> {rental.location?.state}</p>

      <p><strong>Daily Price:</strong> €{rental.dailyPrice}</p>
      <p><strong>Availability:</strong> {rental.availabilityStatus}</p>
      <p><strong>Listing Date:</strong> {formatDate(rental.listingDate)}</p>
      <p><strong>Booking Deadline:</strong> {formatDate(rental.bookingDeadline)}</p>
      <p><strong>Insurance Policy:</strong> {rental.insurancePolicy}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <p style={{ marginTop: '20px' }}>
        <Link to="/">Back to vehicles</Link>
      </p>
    </div>
  );
};

export default VehicleRentalPage;