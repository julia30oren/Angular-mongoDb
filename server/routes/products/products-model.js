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
    image: {
        type: String,
        required: true,
        default: 'https://www.nocowboys.co.nz/images/v3/no-image-available.png'
    }
});

module.exports = mongoose.model('products', ProductSchema)