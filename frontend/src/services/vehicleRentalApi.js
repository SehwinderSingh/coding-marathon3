export const getVehicleRentals = async () => {
    const response = await fetch("/api/vehicleRentals");

    if (!response.ok) {
        throw new Error("Failed to fetch vehicle rentals");
    }

    return response.json();
};