const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FullName = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
});

const Adress = new Schema({
    country: {
        type: String,
        default: 'Israel'
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    apartments: {
        type: String,
        required: true
    },
    phone_num: {
        type: Number,
        required: true
    }
});

const UserSchema = new Schema({
    name: [FullName],
    id: {
        type: Number,
        unique: true
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
    adress: [Adress]
});

module.exports = mongoose.model('users', UserSchema);