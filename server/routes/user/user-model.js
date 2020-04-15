const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Adress = new Schema({

// });

// const List = new Schema({

// })

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        // unique: true
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
    adress: [{
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
    }],
    whish_list: [{
        item_id: {
            type: String
        },
        image: {
            type: String
        },
        name: {
            type: String
        },
        category: {
            type: String
        },
        price: {
            type: Number
        },
        for_quantity: {
            type: Number
        },
        for_measure: {
            type: String
        },
        amount: {
            type: Number,
            default: 1
        }
    }]
});

module.exports = mongoose.model('users', UserSchema);