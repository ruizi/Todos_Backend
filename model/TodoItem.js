const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    holder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    scheduleDate: {
        type: Date,
        default: Date.now
    },
    repeatCircle: {
        type: String,
    }
})

module.exports = TodoItem = mongoose.model('TodoItem', todoItemSchema);