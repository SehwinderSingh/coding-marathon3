import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import EditVehiclePage from "./pages/EditVehiclePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
              element={<SignupPage />}
            />

            <Route
              path="/login"
              element={
                <LoginPage
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />

            <Route
              path="/add-rental"
              element={<AddVehicleRentalPage />}
            />

            <Route
              path="/rentals/:id"
              element={<VehicleRentalPage />}
            />

            <Route
              path="/rental/:id"
              element={<VehicleRentalPage />}
            />

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/signup"
              element={<SignupPage />}
            />

            <Route
              path="/add-rental"
              element={
                <ProtectedRoute>
                  <AddVehicleRentalPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditVehiclePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;