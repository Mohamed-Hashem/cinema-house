const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  email: { type: String, unique: true },
  password: String,
  apiKey: { type: String, default: uuidv4 },
});

module.exports = mongoose.model("User", userSchema);
