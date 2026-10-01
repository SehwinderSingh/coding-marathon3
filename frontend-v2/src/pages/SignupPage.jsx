import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

const SignupPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
    const [city, setCity] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        const newUser = {
            name,
            username,
            password,
            phone_number: phoneNumber,
            licenseNumber,
            date_of_birth: dateOfBirth,
            address: {
                licenseExpiryDate,
                city,
                yearsOfExperience: Number(yearsOfExperience),
            },
        };

        try {
            const data = await signup(newUser);

            // Signup returns a token, so the user is logged in straight away
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="create">
            <h2>Sign Up</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Phone Number:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

                <label>License Number:</label>
                <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />

                <label>Date of Birth:</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

                <label>License Expiry Date:</label>
                <input type="date" value={licenseExpiryDate} onChange={(e) => setLicenseExpiryDate(e.target.value)} required />

                <label>City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />

                <label>Years of Experience:</label>
                <input type="number" min="0" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} required />

                <button type="submit">Sign Up</button>
            </form>

            <p style={{ marginTop: "15px" }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default SignupPage;