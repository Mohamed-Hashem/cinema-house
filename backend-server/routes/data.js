const express = require("express");
const apiKeyAuth = require ("../middleware/auth");
const router = express.Router();

router.get("/data",apiKeyAuth,(req,res)=>{
  res.json({message: "welcome to the protected API", user:req.user.name});
});

router.get("/usage", apiKeyAuth, async(req,res)=>{
  res.json({message:"API usage details", remainingCredits: req.user.credits});
})

module.exports = router;