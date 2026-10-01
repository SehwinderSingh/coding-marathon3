# Self-Assessment — Sajib

## Code Quality and Functionality
I ensured that the frontend codebase is clean, modular, and easy to maintain by separating API logic, pages, and reusable UI components. All core features operate correctly:
- **Public Routes:** `GET /api/vehicleRentals` and `GET /api/vehicleRentals/:id` reliably fetch and render vehicle lists and details without requiring authentication.
- **Protected Operations:** `POST`, `PUT`, and `DELETE` requests correctly attach the `Authorization: Bearer <token>` header to interact with protected backend endpoints.
- **Error Handling:** Implemented handling for `401 Unauthorized` responses and fallback states for failed network calls to keep the user interface responsive and informative.

## Challenges Faced and Solutions
- **Challenge — Managing Token Headers:** Ensuring JWT tokens were consistently included in mutative API calls without repeating code across components.
  - *Solution:* Centralized request logic within `vehicleRentalApi.js` to attach authorization headers automatically when sending `POST`, `PUT`, or `DELETE` requests.
- **Challenge — Shared Components & Routing:** Organizing components like `DeleteModel.jsx` and edit pages without creating conflicts in shared routing files.
  - *Solution:* Isolated state management within individual pages and modal components, keeping `App.jsx` clean and dedicated solely to top-level route declarations.

## Reflection and Key Learnings
- **JWT & Role-Based Workflows:** Gained a deeper understanding of handling public versus protected endpoints in a React application.
- **Full-Stack API Integration:** Improved skills in mapping React state directly to RESTful endpoints (`GET`, `POST`, `PUT`, `DELETE`).
- **Git Branch Management:** Strengthened version control practices by isolating features in the `sajib-w` branch and coordinating pull requests with team members.
