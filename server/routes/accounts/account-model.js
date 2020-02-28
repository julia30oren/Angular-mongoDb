const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    tittle: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    procent: {
        type: Number
    },
    paiements: {
        type: Number
    },
    end_date: {
        type: Date
    }
})

const AccountSchema = new Schema({
    acount_number: {
        type: Number,
        required: true
    },
    action_tipe: [ActionSchema],
    was_created: {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('accounts', AccountSchema);