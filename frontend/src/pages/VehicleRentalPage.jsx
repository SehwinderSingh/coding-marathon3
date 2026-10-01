import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById } from '../services/vehicleRentalApi';
import DeleteModel from '../components/DeleteModel';

const VehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <div>Loading vehicle details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="vehicle-detail-page">
      <h1>{vehicle.title}</h1>
      <p>{vehicle.description}</p>
      <p>Price: ${vehicle.price}/day</p>

      {/* Protected actions */}
      <button onClick={() => navigate(`/vehicles/edit/${id}`)}>Edit Vehicle</button>
      <button onClick={() => setShowDeleteModal(true)}>Delete Vehicle</button>

      {showDeleteModal && (
        <DeleteModel 
          vehicleId={id} 
          onClose={() => setShowDeleteModal(false)} 
        />
      )}
    </div>
  );
};

export default VehicleRentalPage;