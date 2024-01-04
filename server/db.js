const mongoose = require('mongoose')
require('dotenv').config();


const mongoURI=process.env.MONGODB_URI;
mongoose.connect(mongoURI)

const contentSchema = mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      },
    userId: String // Has username and createdAt of user
})

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      }
})

const contentModel = mongoose.model('content', contentSchema)
const userModel = mongoose.model('users', userSchema)

module.exports={contentModel, userModel}