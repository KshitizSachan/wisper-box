const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require('../model/userSchema');
const jwtPassword = process.env.JWT_PASSWORD;
const saltLevel = 8;
const signup = async (req,res) =>
{
  const username = req.body.username;
  const password = req.body.password;
  let hashedPass;
  
  bcrypt.hash(password, saltLevel, async (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      hashedPass = hash;
      await userModel.create({
        username: username,
        password: hashedPass,
      });
    }
  });
  const token = jwt.sign({ username: username }, jwtPassword);
  res.json({
    msg: "User created",
    token: token,
  });
    
}
module.exports = signup;