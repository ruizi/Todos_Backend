const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    todoList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoItem'
    }]
})

module.exports = User = mongoose.model('User', userSchema);