# Self-Grading Report — Sajib

**Total Grade:** 53 / 60

---

## Grade Breakdown & Justification

### 1. Code Quality and Organization (25 / 30)
* **Modular Structure:** Maintained clean separation between API operations (`vehicleRentalApi.js`), page views (`pages/`), and UI components (`components/`).
* **Protected Operations:** Correctly structured JWT `Authorization: Bearer <token>` headers for mutative operations (`POST`, `PUT`, `DELETE`).
* *-5 Points Deduction:* Some components contain repetitive logic and inline styles rather than fully centralized CSS classes, and error handling for edge cases could be further refined.

---

### 2. Completion of Assigned Features (28 / 30)
* **Public Features:** Implemented public vehicle listing (`HomePage.jsx`) and detailed vehicle views (`VehicleRentalPage.jsx`) using `GET /api/vehicleRentals`.
* **Protected Operations:** Delivered vehicle creation (`AddVehicleRentalPage.jsx`), modification (`EditVehiclePage.jsx`), and deletion modal (`DeleteModel.jsx`).
* **Git Workflow:** Successfully authored features on the `sajib-w` branch and collaborated on pull requests with team members.
* *-2 Points Deduction:* Minor UI layout alignments and navigation edge cases needed small adjustments during integration testing.
