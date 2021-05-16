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
    avatar: {
        type: String,
    },
    todoGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TodoGroup',
        }
    ],
})

module.exports = User = mongoose.model('User', userSchema);