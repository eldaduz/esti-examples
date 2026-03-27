import express from "express";

let users = [
  { id: 2, name: "Noa" },
  { id: 3, name: "Yossi" },
];

const app = express();

/*
  ===== MIDDLEWARES =====
*/

// Middleware to parse JSON (needed for POST/PUT requests)
app.use(express.json());

// Logging middleware – logs every incoming request
app.use((req, res, next) => {
  console.log(`${req.method}${req.url}`);
  next();
});

// Middleware to attach request time to each request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/*
  Authorization middleware
  Example request from frontend:

  fetch("http://localhost:3000/users", {
    headers: {
      authorization: "secret123"
    }
  })
*/
app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader !== "secret123") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
});

/*
  ===== ROUTES =====
*/

// Get all users
app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

// Get a single user by ID
app.get("/users/:id", (req, res, next) => {
  const userId = Number(req.params.id);

  // Validate that ID is a number
  if (isNaN(userId)) {
    const error = new Error("User id must be a number");
    error.statusCode = 400;
    return next(error);
  }

  const user = users.find((user) => user.id === userId);

  // User not found
  if (!user) {
    const error = new Error(
      `User with id ${userId} not found, the requestTime is ${req.requestTime}`,
    );
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ user });
});

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  // User not found
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with id ${userId} not found` });
  }

  // Remove user from array
  users = users.filter((user) => user.id !== userId);

  res.status(200).json({
    message: `User with id ${userId} deleted successfully`,
    deletedUser: user,
    updatedUser: users,
  });
});

/*
  ===== NOT FOUND =====
  Runs if no route matched
*/
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/*
  ===== ERROR HANDLER =====
  Handles all errors passed with next(error)
*/
app.use((err, req, res, next) => {
  console.log("Error middleware:", err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

// Start server
app.listen(3000, () =>
  console.log("Server is running on port 3000!!"),
);
