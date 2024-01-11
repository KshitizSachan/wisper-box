const jwt = require("jsonwebtoken");
const contentModel = require('../model/contentSchema');
const userModel = require('../model/userSchema');
const jwtPassword = process.env.JWT_PASSWORD;
const content_create = async (req,res) =>
{
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
    
}
module.exports = content_create;