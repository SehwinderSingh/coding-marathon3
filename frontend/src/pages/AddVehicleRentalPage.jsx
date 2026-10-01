import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVehicleRentalPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleModel: "",
    category: "Economy",
    description: "",
    agencyName: "",
    agencyEmail: "",
    fleetSize: "",
    city: "",
    state: "",
    dailyPrice: "",
    availabilityStatus: "available",
    bookingDeadline: "",
    insurancePolicy: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const vehicleRental = {
      vehicleModel: formData.vehicleModel,
      category: formData.category,
      description: formData.description,

      agency: {
        name: formData.agencyName,
        contactEmail: formData.agencyEmail,
        fleetSize: formData.fleetSize
          ? Number(formData.fleetSize)
          : undefined,
      },

      location: {
        city: formData.city,
        state: formData.state,
      },

      dailyPrice: Number(formData.dailyPrice),
      availabilityStatus: formData.availabilityStatus,
      bookingDeadline: formData.bookingDeadline || undefined,
      insurancePolicy: formData.insurancePolicy,
    };

    try {
      const response = await fetch("/api/vehicleRentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleRental),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create vehicle rental");
      }

      console.log("Vehicle rental created:", data);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Vehicle Rental</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          name="vehicleModel"
          value={formData.vehicleModel}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Agency Name:</label>
        <input
          type="text"
          name="agencyName"
          value={formData.agencyName}
          onChange={handleChange}
          required
        />

        <label>Agency Email:</label>
        <input
          type="email"
          name="agencyEmail"
          value={formData.agencyEmail}
          onChange={handleChange}
          required
        />

        <label>Fleet Size:</label>
        <input
          type="number"
          name="fleetSize"
          value={formData.fleetSize}
          onChange={handleChange}
          min="0"
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label>Daily Price:</label>
        <input
          type="number"
          name="dailyPrice"
          value={formData.dailyPrice}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />

        <label>Availability Status:</label>
        <select
          name="availabilityStatus"
          value={formData.availabilityStatus}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <label>Booking Deadline:</label>
        <input
          type="date"
          name="bookingDeadline"
          value={formData.bookingDeadline}
          onChange={handleChange}
        />

        <label>Insurance Policy:</label>
        <input
          type="text"
          name="insurancePolicy"
          value={formData.insurancePolicy}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Vehicle Rental"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicleRentalPage;