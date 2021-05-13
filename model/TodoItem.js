const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    isFinished: {
        type: Boolean,
        default: false,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    scheduleAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    repeatCircle: {
        type: String,
        default: "Once"
    }
})

module.exports = TodoItem = mongoose.model('TodoItem', todoItemSchema);