const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user_to_do: {
        type: String,
        required: false
    },
    id_done: {
        type: Boolean,
        required: true,
        default: false
    },
    was_created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('tasks', TaskSchema)