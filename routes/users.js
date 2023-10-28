require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken")
const { authenticateJwt } = require("../middleware/auth");
const { User } = require("../db");
const router = express.Router();
const SECRET = process.env.USER_SECRET;

router.get('/me', authenticateJwt, async(req, res)=>{
  const user = await User.findOne({username: req.user.username})
  if(!user){
    res.status(403).json({
      msg: "User doesn't exist"
    })
    return 
  }
  res.json({username : user.username})
})

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) {
    
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }else{
    
    res.sendStatus(403).json({message : "User already exists!!"});
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.sendStatus(403).json({ message : "Invalid Username or password"});
  }
});


module.exports = router;

