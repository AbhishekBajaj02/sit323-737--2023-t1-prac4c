# sit323-737--2023-t1-prac4c

This is a Node.js server-side application code that provides RESTful API endpoints for basic mathematical operations like addition, subtraction,
multiplication, and division. It also includes a login endpoint that authenticates users with a username and password and returns a JSON Web Token (JWT)
that can be used for subsequent authorized requests. The application uses Express.js for handling HTTP requests, Passport.js for authentication and JWT
handling, and JWT for token generation.
The server listens on port 3000 and has an endpoint for the home page. There are separate endpoints for each mathematical operation that accept two
parameters n1 and n2 via query parameters. If any of the parameters is missing or not a number, the endpoint returns an error message.
The authentication endpoint is also available at the /login endpoint. It checks whether the provided username and password are valid and returns a JWT if
the authentication is successful. The JWT is signed using a secret key, which is hardcoded in the application.
Overall, this code is a good starting point for building a simple Node.js application that provides basic API endpoints and handles user authentication with JWT.
