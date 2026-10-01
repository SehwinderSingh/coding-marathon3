# self-assessment-sehwinder

- Evaluate the quality and functionality of your code

My code works well. All the CRUD routes work for V1 and V2 and give the right responses, like 404 when a rental is not found and 400 when the data is wrong. In V2, passwords are hashed and only logged-in users can add, edit or delete. I wrote tests with Vitest and Supertest, 21 for V1 and 30 for V2, and they all pass. I kept the code organised in routes, controllers, models and middleware like the starter code.

- Discuss challenges faced and how you overcame them

The hardest part was when we merged everyone's work. Things that worked alone broke together, for example a wrong link in the navbar and different field names in the User model, so signup didn't work. I fixed these by running the tests and reading the error messages carefully. I also had Git problems, like branches being behind main and wrong files in commits, and setup problems with environment variables and the Atlas connection. I used an AI assistant to help me understand errors and find fixes, and I checked everything by running the tests myself.

- Reflect on what you learned

I learned how to make a REST API with login and protected routes using JWT and bcrypt, how to test it with Vitest and Supertest, and how to deploy with Render and MongoDB Atlas. I also learned that a team should agree on field names and how the API works at the start, because that would have saved us a lot of time. Using branches and pull requests made it easier to find where problems came from.