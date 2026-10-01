import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVehicle } from '../services/vehicleRentalApi';

const AddVehicleRentalPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', price: '', description: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await addVehicle(formData);
      navigate('/');
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        setError('Session expired or invalid credentials. Please log in again.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vehicle</h2>
      {error && <p className="error">{error}</p>}
      
      <input 
        type="text" 
        placeholder="Title"
        value={formData.title} 
        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
        required 
      />
      <input 
        type="number" 
        placeholder="Price"
        value={formData.price} 
        onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
        required 
      />
      <textarea 
        placeholder="Description"
        value={formData.description} 
        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
      />

      <button type="submit">Add Vehicle</button>
    </form>
  );
};

export default AddVehicleRentalPage;