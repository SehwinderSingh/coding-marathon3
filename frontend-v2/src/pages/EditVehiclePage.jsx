import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authHeader } from "../services/authService";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the existing vehicle rental
  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);
        if (!res.ok) throw new Error("Failed to load vehicle rental");
        const data = await res.json();

        setVehicleModel(data.vehicleModel || "");
        setCategory(data.category || "");
        setDescription(data.description || "");
        setAgencyName(data.agency?.name || "");
        setContactEmail(data.agency?.contactEmail || "");
        setFleetSize(data.agency?.fleetSize ?? "");
        setCity(data.location?.city || "");
        setState(data.location?.state || "");
        setDailyPrice(data.dailyPrice ?? "");
        setAvailabilityStatus(data.availabilityStatus || "available");
        setBookingDeadline(data.bookingDeadline ? data.bookingDeadline.slice(0, 10) : "");
        setInsurancePolicy(data.insurancePolicy || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);

  // Send the PUT request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const updatedRental = {
      vehicleModel,
      category,
      description,
      agency: {
        name: agencyName,
        contactEmail,
        ...(fleetSize !== "" && { fleetSize: Number(fleetSize) }),
      },
      location: { city, state },
      dailyPrice: Number(dailyPrice),
      availabilityStatus,
      ...(bookingDeadline && { bookingDeadline }),
      insurancePolicy,
    };

    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify(updatedRental),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || data.message || "Failed to update vehicle rental");
      }
      navigate(`/rentals/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  const field = { width: "100%", padding: "8px", marginBottom: "10px" };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Edit Vehicle Rental</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Vehicle Model:</label>
        <input style={field} value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} required />

        <label>Category:</label>
        <input style={field} value={category} onChange={(e) => setCategory(e.target.value)} required />

        <label>Description:</label>
        <textarea style={field} value={description} onChange={(e) => setDescription(e.target.value)} required />

        <h3>Agency</h3>
        <label>Agency Name:</label>
        <input style={field} value={agencyName} onChange={(e) => setAgencyName(e.target.value)} required />

        <label>Contact Email:</label>
        <input style={field} type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />

        <label>Fleet Size:</label>
        <input style={field} type="number" value={fleetSize} onChange={(e) => setFleetSize(e.target.value)} />

        <h3>Location</h3>
        <label>City:</label>
        <input style={field} value={city} onChange={(e) => setCity(e.target.value)} required />

        <label>State:</label>
        <input style={field} value={state} onChange={(e) => setState(e.target.value)} required />

        <label>Daily Price (€):</label>
        <input style={field} type="number" step="0.01" value={dailyPrice} onChange={(e) => setDailyPrice(e.target.value)} required />

        <label>Availability:</label>
        <select style={field} value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
          <option value="available">available</option>
          <option value="rented">rented</option>
          <option value="maintenance">maintenance</option>
        </select>

        <label>Booking Deadline:</label>
        <input style={field} type="date" value={bookingDeadline} onChange={(e) => setBookingDeadline(e.target.value)} />

        <label>Insurance Policy:</label>
        <input style={field} value={insurancePolicy} onChange={(e) => setInsurancePolicy(e.target.value)} required />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>Save Changes</button>
          <button type="button" onClick={() => navigate(`/rentals/${id}`)} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehiclePage;