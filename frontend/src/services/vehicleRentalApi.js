
const getAuthToken = () => {
  return localStorage.getItem('token'); // Adjust key if stored under a different name (e.g., 'jwt_token')
};


const getHeaders = (isProtected = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (isProtected) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};


const handleResponse = async (response) => {
  if (response.status === 401) {
    
    localStorage.removeItem('token');
    throw new Error('Unauthorized. Please log in again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  
  if (response.status === 204) {
    return true;
  }

  return response.json();
};


export const getVehicles = async () => {
  const response = await fetch('/api/vehicleRentals', {
    method: 'GET',
    headers: getHeaders(false),
  });
  return handleResponse(response);
};

export const getVehicleById = async (id) => {
  const response = await fetch(`/api/vehicleRentals/${id}`, {
    method: 'GET',
    headers: getHeaders(false),
  });
  return handleResponse(response);
};

export const addVehicle = async (vehicleData) => {
  const response = await fetch('/api/vehicleRentals', {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(vehicleData),
  });
  return handleResponse(response);
};

export const updateVehicle = async (id, vehicleData) => {
  const response = await fetch(`/api/vehicleRentals/${id}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(vehicleData),
  });
  return handleResponse(response);
};


export const deleteVehicle = async (id) => {
  const response = await fetch(`/api/vehicleRentals/${id}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  });
  return handleResponse(response);
};