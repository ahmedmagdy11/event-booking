const mongoose = require("mongoose");

const EvenShcema = new mongoose.Schema({
  name :{
      type:String,
      required:true
  },
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
});

const Event = mongoose.model('event',EvenShcema)

module.exports = Event 