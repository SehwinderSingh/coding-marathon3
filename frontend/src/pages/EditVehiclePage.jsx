import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [model, setModel] = useState("");
  const [category, setCategory] = useState("Sedan");
  const [dailyPrice, setDailyPrice] = useState("");
  const [availability, setAvailability] = useState("available");

  // Load old vehicle data when page loads
  useEffect(() => {
    fetch(`/api/vehicleRentals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data.model || "");
        setCategory(data.category || "Sedan");
        setDailyPrice(data.dailyPrice || "");
        setAvailability(data.availability || "available");
      })
      .catch((err) => console.log("Error loading vehicle:", err));
  }, [id]);

  // Handle PUT request on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedVehicle = {
      model,
      category,
      dailyPrice: Number(dailyPrice),
      availability,
    };

    fetch(`/api/vehicleRentals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVehicle),
    })
      .then(() => {
        alert("Vehicle updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log("Error updating vehicle:", err));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Edit Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Daily Price (€):</label>
          <input
            type="number"
            value={dailyPrice}
            onChange={(e) => setDailyPrice(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Availability:</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="available">available</option>
            <option value="rented">rented</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVehiclePage;