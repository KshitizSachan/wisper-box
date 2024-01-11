const mongoose = require('mongoose');
const contentSchema = mongoose.Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
      },
    userId: String // Has username and createdAt of user
});
const contentModel = mongoose.model('content', contentSchema);
module.exports = contentModel;