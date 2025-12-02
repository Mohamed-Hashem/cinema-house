const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async(req,res)=>{
  const{ name,email,password} = req.body;

  let user = await User.findOne({email});
  if(user) return res.status(400).json({message:"User already exists"});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);

  user = new User({name,email,password:hashedPassword, credits:100});
  await user.save();

  res.json({message:"User registered successfully", apiKey: user.apiKey});

});
module.exports = router;

