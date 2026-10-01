# contributions-sehwinder

## Describe the features/branches you created

- I made the team GitHub repo from the starter code and added everyone as collaborators.
- **backend-sehwinder (API V1):** I made all the CRUD routes for vehicle rentals (get all, get one, create, update, delete). I also set up Vitest and a separate test database, and made the backend serve the frontend so it works on Render.
- I fixed some frontend problems after merging, like the Add Vehicle link not working and the Edit and Delete buttons missing.
- I created the backend-v2 and frontend-v2 folders so V1 and V2 stay separate.
- **be-v2-sehwinder (API V2):** I made the signup and login routes with password hashing (bcrypt) and tokens (JWT), set up a separate V2 database, and wrote the auth tests.
- I tested everything together after merging and fixed bugs so all tests pass.
- I set up MongoDB Atlas with separate databases for V1 and V2.

## List the commits and pull requests you authored

**Pull requests:** #1, #3, #4 (backend-sehwinder) and #8 (be-v2-sehwinder)

**Commits:**
- Done get all and get by id for vehicle rental
- Post, Put and delete added
- created vitest config
- Test mongo uri added
- Tests Done
- added frontend build in for render
- Fix Add Vehicle link to match /add-rental route
- Fix edit page field names and add edit/delete to details page
- Add Edit and Delete buttons to vehicle rental details page
- Serve frontend build from backend/view for Render
- created backend-v2 and frontend-v2
- Config sep v2 data
- added signup and login
- added tests
- testing done

## Explain your role in the group project

I worked on the backend with Yun. I made the V1 API and in V2 I made signup, login and the auth tests. I also set up the repo, merged and tested everyone's work, fixed problems when things didn't work together, and did the database and deployment setup.