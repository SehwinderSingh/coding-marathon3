import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const data = await login({ username, password });

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
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />

                <button type="submit">Login</button>
            </form>

            <p style={{ marginTop: "15px" }}>
                No account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default LoginPage;