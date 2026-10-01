import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import EditVehiclePage from "./pages/EditVehiclePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/signup"
              element={
                isAuthenticated
                  ? <Navigate to="/" />
                  : <SignupPage setIsAuthenticated={setIsAuthenticated} />
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated
                  ? <Navigate to="/" />
                  : <LoginPage setIsAuthenticated={setIsAuthenticated} />
              }
            />

            {/* Protected pages: only for logged-in users */}
            <Route
              path="/add-rental"
              element={isAuthenticated ? <AddVehicleRentalPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/edit/:id"
              element={isAuthenticated ? <EditVehiclePage /> : <Navigate to="/login" />}
            />

            <Route
              path="/rentals/:id"
              element={<VehicleRentalPage isAuthenticated={isAuthenticated} />}
            />

            <Route
              path="/rental/:id"
              element={<VehicleRentalPage isAuthenticated={isAuthenticated} />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;