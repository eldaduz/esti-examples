import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./mongodb.js";
import User from "./mongomodels/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const app = express();

const JWT_SECRET = "my-super-secret-key";

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

//AUTH MIDDLEWARE
const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWUxZTFiZmY5MTNkZmY5NWNmZGUyYWIiLCJpYXQiOjE3NzY0MTQ4MDIsImV4cCI6MTc3NjQxODQwMn0.W1-2-MRscecRg2vu7UnLQDdhofKKbRKe-GHKHuP9130
  if (!authHeader) {
    return res.status(401).json({ message: "Invalid authorization" });
  }
  const tokenParts = authHeader.split(" ");

  console.log("tokenParts", tokenParts);

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  const token = tokenParts[1];
  try {
    console.log("try do decode token");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next();
};

/*
  ===== CONNECT TO DB =====
*/
// connectDB();

/*
  ===== ROUTES =====
*/

//REGISTER
app.post("/auth/register", async (req, res, next) => {
  const { name, color, age, email, password } = req.body;
  try {
    //check if user aleady exist
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const error = new Error(`User with email ${email} already exist`);
      error.statusCode = 400;
      return next(error);
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save to db
    const newUser = await User.create({
      name,
      color,
      age,
      email,
      password: hashedPassword,
    });

    console.log("newUser", newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        color: newUser.color,
        age: newUser.age,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    ////check if user aleady exist
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error(`Invalid email or password`);
      error.statusCode = 400;
      return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      const error = new Error(`Invalid email or password`);
      error.statusCode = 401;
      return next(error);
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successfully", token });
  } catch (error) {}
});

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
app.put("/users/:id", authMiddleWare, async (req, res, next) => {
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
app.delete("/users/:id", authMiddleWare, async (req, res, next) => {
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

// Connect to the DB first, then start listening
connectDB().then(() => {
  app.listen(3000, () =>
    console.log("MongoDB server running on http://localhost:3000"),
  );
});
