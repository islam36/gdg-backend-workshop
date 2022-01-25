const mongoose = require('mongoose');

//declaring the author schema
const authorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        minlength: 3,
        required: true
    },
    lastname: {
        type: String,
        minlength: 3,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('author', authorSchema);