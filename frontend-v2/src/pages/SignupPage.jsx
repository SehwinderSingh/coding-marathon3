import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

const SignupPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            await signup({
                name,
                email,
                password,
            });

            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                </div>

                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>

                <br />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;