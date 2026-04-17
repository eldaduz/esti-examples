import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minlength: [2, "name must be at least 2 characters long"],
  },
  color: {
    type: String,
    required: [true, "color is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    min: [0, "age cannot be negative"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password must be at least 6 characters long"],
    select: false,
  },
});

export default mongoose.model("User", userSchema);
