import mongoose, { model } from "mongoose";

const RentalsSchema = new mongoose.Schema({
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  classes: {
    type: String,
    required: true,
    enum: ["apartment", "house", "room"],
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rented: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
  },
  bedrooms: {
    type: Number,
  },
  bathrooms: {
    type: Number,
  },

  inquiries: [
    {
      type: Object,
    },
  ],
});

const Rentals = mongoose.model("Rental", RentalsSchema);

export default Rentals;
