//ooga booga
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel, contentModel } = require("./db");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

const jwtPassword = process.env.JWT_PASSWORD;
const saltLevel = 8;

//---------------------------------------------User Login----------------------------------

app.post("/userLogin", async (req, res) => {
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
  
});


//---------------------------------------------User Signup----------------------------------

app.post("/userSignup", (req, res) => {
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
});

//---------------------------------------------Create Content------------------------------------

// Handle if user is not authorized

app.post("/createContent", async (req, res) =>{
  const token = req.headers.authorization;
  const title = req.body.title;
  const description = req.body.description;

  if (!token) {
    return res.status(401).json({ msg: "JWT token must be provided" });
  }
  let decode;

  try {
    decode = jwt.verify(token, jwtPassword);
  } catch (error) {
    return res.status(401).json({ msg: "Invalid JWT token" });
  }

  const username = decode.username;
  const user = await userModel.findOne({username})
  const userId = user.username+"||"+user.createdAt;
  if(user != null || user!=undefined){
    await contentModel.create({
      title: title,
      description: description,
      userId: userId
    })
    res.status(200).json({
      msg: "Content published successfully"
    })
  }else{
    res.json({
      msg: "Authentication Failed"
    })
  } 
})

//---------------------------------------------Get All Content-------------------------------------------

app.get("/getContent", async (req, res) =>{
  const data = await contentModel.find();
  res.status(200).json({
    data
  })
})




app.listen(5000, () => {
  console.log("Server up and running");
});
