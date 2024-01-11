const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      }
});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;