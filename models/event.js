const mongoose = require("mongoose");

const EvenShcema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required:true
  },
});

const Event = mongoose.model("event", EvenShcema);

module.exports = Event;
