// Write the mongoDb model for user Address

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    name: {
      type: String,
      required: [true, "name of the address holder is required"],
    },
    email: {
      type: String,
      required: [true, "User Email is Required"],
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    city: {
      type: String,
      required: [true, "City is Required"],
    },
    state: {
      type: String,
      required: [true, "State is Required"],
    },
    country: {
      type: String,
      default: "India",
      required: [true, "country is Required"],
    },
    pincode: {
      type: Number,
      required: [true, "PinCode is Required"],
    },
    phoneNo: {
      type: Number,
      required: [true, "Phone Number is Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
