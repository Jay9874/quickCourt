const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['player', 'facility', 'admin'],
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
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
    isVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);