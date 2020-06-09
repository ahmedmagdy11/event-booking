const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema({
  username :{
      type:String,
      required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  Events:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'event'
  }]
});

const User = mongoose.model('user',UserShcema)

module.exports = User