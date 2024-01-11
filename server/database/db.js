const mongoose = require('mongoose')
require('dotenv').config();
const Connection = async (username, password) => {
  const mongoURI=process.env.MONGODB_URI;
  await mongoose.connect(mongoURI);
  console.log('Database Connected Succesfully');
};
module.exports = Connection;
