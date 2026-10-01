const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getVehicleRentals = async () => {
  const response = await fetch("/api/vehicleRentals");
  return handleResponse(response);
};

export const getVehicleRentalById = async (id) => {
  const response = await fetch(`/api/vehicleRentals/${id}`);
  return handleResponse(response);
};

export const createVehicleRental = async (vehicleData) => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/vehicleRentals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vehicleData),
  });

  return handleResponse(response);
};

export const updateVehicleRental = async (id, vehicleData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`/api/vehicleRentals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(vehicleData),
  });

  return handleResponse(response);
};

export const deleteVehicleRental = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`/api/vehicleRentals/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};
