const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    name : String,
    message : String
});

module.exports = mongoose.model('Chat', chatSchema);