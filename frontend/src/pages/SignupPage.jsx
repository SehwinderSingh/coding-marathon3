import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone_number: "",
    licenseNumber: "",
    date_of_birth: "",
    licenseExpiryDate: "",
    city: "",
    yearsOfExperience: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          phone_number: formData.phone_number,
          licenseNumber: formData.licenseNumber,
          date_of_birth: formData.date_of_birth,
          address: {
            licenseExpiryDate: formData.licenseExpiryDate,
            city: formData.city,
            yearsOfExperience: Number(formData.yearsOfExperience),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    display: "block",
    width: "100%",
    marginBottom: "15px",
    padding: "8px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h2>Create Account</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>Username:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>Phone Number:</label>
        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>License Number:</label>
        <input
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>License Expiry Date:</label>
        <input
          type="date"
          name="licenseExpiryDate"
          value={formData.licenseExpiryDate}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>City:</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          style={fieldStyle}
          required
        />

        <label>Years of Experience:</label>
        <input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          style={fieldStyle}
          min="0"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Signup"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;