import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is requireddddddd"],
    trim: true,
    minlength: [2, "name must beeeee at least 2 characters long"],
  },
  color: {
    type: String,
    required: [true, "color is required!!!!"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "age is required"],
    min: [0, "age cannot be negative!!!!!"],
  },
  address: {
    type: String,
    required: true,
  },
  phone: Number,
});

export default mongoose.model("User", userSchema);
