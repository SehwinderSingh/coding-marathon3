import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateVehicleRental } from "../services/vehicleRentalApi";

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
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const response = await fetch(`/api/vehicleRentals/${id}`);

        if (!response.ok) {
          throw new Error("Failed to load vehicle rental");
        }

        const data = await response.json();

        setVehicleModel(data.vehicleModel || "");
        setCategory(data.category || "");
        setDescription(data.description || "");

        setAgencyName(data.agency?.name || "");
        setContactEmail(data.agency?.contactEmail || "");
        setFleetSize(data.agency?.fleetSize ?? "");

        setCity(data.location?.city || "");
        setState(data.location?.state || "");

        setDailyPrice(data.dailyPrice ?? "");
        setAvailabilityStatus(data.availabilityStatus || "");
        setBookingDeadline(
          data.bookingDeadline
            ? data.bookingDeadline.substring(0, 10)
            : ""
        );
        setInsurancePolicy(data.insurancePolicy || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleRental();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const updatedRental = {
      vehicleModel,
      category,
      description,
      agency: {
        name: agencyName,
        contactEmail,
        ...(fleetSize !== "" && {
          fleetSize: Number(fleetSize),
        }),
      },
      location: {
        city,
        state,
      },
      dailyPrice: Number(dailyPrice),
      availabilityStatus,
      ...(bookingDeadline && {
        bookingDeadline,
      }),
      insurancePolicy,
    };

    try {
      await updateVehicleRental(id, updatedRental);
      navigate(`/rentals/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading vehicle...</p>;
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>Edit Vehicle Rental</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Model</label>
          <input
            type="text"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <h3>Agency</h3>

        <div>
          <label>Agency Name</label>
          <input
            type="text"
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contact Email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fleet Size</label>
          <input
            type="number"
            value={fleetSize}
            onChange={(e) => setFleetSize(e.target.value)}
            min="0"
          />
        </div>

        <h3>Location</h3>

        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Daily Price</label>
          <input
            type="number"
            value={dailyPrice}
            onChange={(e) => setDailyPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Availability Status</label>
          <select
            value={availabilityStatus}
            onChange={(e) =>
              setAvailabilityStatus(e.target.value)
            }
            required
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label>Booking Deadline</label>
          <input
            type="date"
            value={bookingDeadline}
            onChange={(e) =>
              setBookingDeadline(e.target.value)
            }
          />
        </div>

        <div>
          <label>Insurance Policy</label>
          <textarea
            value={insurancePolicy}
            onChange={(e) =>
              setInsurancePolicy(e.target.value)
            }
            required
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Vehicle"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/rentals/${id}`)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehiclePage;