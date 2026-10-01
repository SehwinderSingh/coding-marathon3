const API_URL = "/api/auth";

const request = async (path, userData, fallbackMessage) => {
    const response = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || data.message || fallbackMessage);
    }

    return data;
};

export const signup = (userData) => request("/signup", userData, "Signup failed");

export const login = (userData) => request("/login", userData, "Login failed");

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const authHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};