import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./mongodb.js";
import User from "./mongoModels/user.js";
const app = express();

/*
  ===== MIDDLEWARES =====
*/
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

// GET /users
// supports optional query params: color, minAge
app.get("/users", async (req, res, next) => {
  try {
    const { color, minAge } = req.query;

    const filter = {};

    if (color) {
      filter.color = color;
    }

    if (minAge) {
      filter.age = { $gte: Number(minAge) };
    }

    const users = await User.find(filter);

    res.status(200).json({
      requestTime: req.requestTime,
      users,
    });
  } catch (error) {
    next(error);
  }
});

// GET /users/:id
app.get("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error("Invalid user id format");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error(
        `User with id ${userId} not found, the requestTime is ${req.requestTime}`,
      );
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      requestTime: req.requestTime,
      user,
    });
  } catch (error) {
    next(error);
  }
});

// POST /users
app.post("/users", async (req, res, next) => {
  const { name, color, age } = req.body;

  try {
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      const error = new Error(`User with name ${name} already exists`);
      error.statusCode = 400;
      return next(error);
    }

    const newUser = await User.create({ name, color, age });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id
app.put("/users/:id", async (req, res, next) => {
  const userId = req.params.id;
  const { name, color, age } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error("Invalid user id format");
      error.statusCode = 400;
      return next(error);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, color, age },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      const error = new Error(`User with id ${userId} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /users/:id
app.delete("/users/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error("Invalid user id format");
      error.statusCode = 400;
      return next(error);
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      const error = new Error(`User with id ${userId} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: `User with id ${userId} deleted successfully`,
      deletedUser,
    });
  } catch (error) {
    next(error);
  }
});

/*
  ===== NOT FOUND =====
*/
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/*
  ===== ERROR HANDLER =====
*/
app.use((err, req, res, next) => {
  console.log("Error middleware:", err.name, err.message);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  // Mongoose cast errors
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid value format",
    });
  }

  // Duplicate key error (for unique fields)
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate value error",
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

app.listen(3000, () => console.log("Server is running on port 3000!!"));
