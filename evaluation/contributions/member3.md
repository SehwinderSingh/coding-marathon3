# Contribution Report — Frontend & Protected Vehicle Features

**Branch:** `sajib-w`  
**Role:** Frontend Developer (Vehicle Features, API Integration & Authentication)

### Features & Implementation
* **Public Vehicle Access (V1 & V2):** Developed `HomePage.jsx` and `VehicleRentalPage.jsx` to fetch and display the vehicle list and individual vehicle details via `GET /api/vehicleRentals`.
* **Protected Operations (V2):** Built `AddVehicleRentalPage.jsx`, `EditVehiclePage.jsx`, and `DeleteModel.jsx` to enable creating, editing, and deleting vehicle entries.
* **JWT & API Security:** Updated `vehicleRentalApi.js` to attach `Authorization: Bearer <token>` headers to all `POST`, `PUT`, and `DELETE` requests, with handling for 401 Unauthorized errors.
* **UI Components:** Implemented `VehicleRentalListing.jsx` and `VehicleRentalListings.jsx` for clean data display across the application.

### Team Collaboration
* Worked on the `sajib-w` branch and sajib-frontend-v2 and submitted Pull Requests to `main`.
* Verified both public (`GET`) and protected (`POST`, `PUT`, `DELETE`) API workflows with the team.
