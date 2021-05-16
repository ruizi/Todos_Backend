const mongoose = require('mongoose');

const todoGroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todoList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TodoItem'
        }
    ]
})

module.exports = TodoGroup = mongoose.model('TodoGroup', todoGroupSchema);