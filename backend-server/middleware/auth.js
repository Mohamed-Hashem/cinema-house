const User = require("../models/User");

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.header("X-api-key");
  if(!apiKey) return res.status(401).json({message:"NO api key provided"});

  const user = await User.findOne({apiKey});
  if(!user) return res.status(403),json({message:"Invalid API KEY"});

  if(user.credits<=0){
    return res.status(402).json({message: "Insufficeint Credits, Buy now"});
  }

  user.credits -=10;
  await user.save();

  req.user = user;
  next();

};
module.exports = apiKeyAuth;