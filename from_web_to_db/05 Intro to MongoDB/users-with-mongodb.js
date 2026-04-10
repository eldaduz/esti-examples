import express from "express";
import cors from "cors";
import { connectDB, getDB } from "./mongodb.js";
import { ObjectId } from "mongodb";

const app = express();

/*
  ===== MIDDLEWARES =====
*/
// Enable CORS (allow requests from frontend)
app.use(cors());

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
  ===== CONNECT TO DB =====
*/

connectDB();

/*
  ===== ROUTES =====
*/

// Get all users
app.get("/users", async (req, res, next) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();

    res.status(200).json({ users }); //{users: users}
  } catch (error) {
    next(error);
  }
});

// Get a single user by ID
app.get("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    // User not found
    if (!user) {
      const error = new Error(
        `User with id ${userId} not found, the requestTime is ${req.requestTime}`,
      );
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
  const { name, color, age } = req.body;

  if (!name) {
    const error = new Error("name is required");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const db = getDB();
    const existingUser = await db.collection("users").findOne({ name });

    if (existingUser) {
      const error = new Error(`User with name ${name} already exists`);
      error.statusCode = 400;
      return next(error);
    }

    //check what to pass in the object
    const result = await db.collection("users").insertOne({ name });
    console.log("result:", result);

    res.status(201).json({
      message: "User created successfully",
      insertedId: result.insertedId,
      user: { name },
    });
  } catch (error) {
    next(error);
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    // User not found
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${userId} not found` });
    }

    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });

    res.status(200).json({
      message: `User with id ${userId} deleted successfully`,
      deletedUser: user,
    });
  } catch (error) {
    next(error);
  }
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
app.listen(3000, () => console.log("Server is running on port 3000!!"));

// Query Params vs Route Params:
// Query Params are optional and used for filtering/sorting → req.query (e.g. /api/books?year=2008)
// Route Params are part of the resource path → req.params (e.g. /users/123)

// Example: Express API demonstrating filtering and sorting using query parameters
