const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'other', ''],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
