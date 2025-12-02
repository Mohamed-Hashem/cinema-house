const mongoose = require("mongoose");
const { v4: uuidv4} = require("uuid");

const userSchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique: true},
  password:String,
  apiKey:{type:String, default: uuidv4},
  credits:{type:String, default:100},
});

module.exports = mongoose.model("User", userSchema);