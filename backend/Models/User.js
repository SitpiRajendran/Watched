const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //Profile Info.
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    following: {
        type: [String],
        required: true
    },
    movieList: {
        type: [String],
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;