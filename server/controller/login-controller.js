const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require('../model/userSchema');
const jwtPassword = process.env.JWT_PASSWORD;
const login = async (req,res) =>
{
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      // Compare the password from the request with the hashed password stored in the database
      bcrypt.compare(password, user.password, (compareErr, result) => {
        if (compareErr) {
          // Handle error
          console.log(compareErr);
          res.status(500).json({ msg: "Internal Server Error" });
        } else if (result) {
          // Passwords match, generate and send JWT token
          const token = jwt.sign({ username: username }, jwtPassword);
          res.json({
            msg: "Successfully logged in",
            token: token,
          });
        } else {
          // Passwords do not match
          res.status(401).json({ msg: "Invalid password" });
        }
      });
    } else {
      // User not found
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
module.exports = login;