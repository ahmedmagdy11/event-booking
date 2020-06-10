const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    eventID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "event",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", BookingSchema);

module.exports = Booking;
