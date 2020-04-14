const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    for_quantity: {
        type: Number,
        required: true,
        default: 1
    },
    for_measure: {
        type: String,
        required: true,
        default: ''
    },
    image: {
        type: String,
        required: true,
        default: 'https://www.nocowboys.co.nz/images/v3/no-image-available.png'
    }
});

module.exports = mongoose.model('products', ProductSchema)