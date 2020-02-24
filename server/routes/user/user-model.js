const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    was_created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('users', UserSchema);