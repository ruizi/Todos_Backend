const User = require('../model/User');

const findAUserByEmail = async (email) => {
    return (await User.findOne({email: email}));
}

const findAUserById = async (userId) => {
    return (await User.findOne({_id: userId}));
}

const findAUserByIdAndPopulateTodoList = async (userId) => {
    return (await User.findOne({_id: userId}).select('-password').populate('todoList'));
}

const findAUserAndAddTodoItems = async (userId, newTodoItemId) => {
    const creator = await User.findOne({_id: userId});
    creator.todoList.push(newTodoItemId);
    return (await creator.save());
}

const creatANewUser = async (newUserObj) => {
    return (await new User(newUserObj).save());
}

const deleteATodoItemInTodoList = async (userId, todoItemId) => {
    const user = await User.findOne({_id: userId});
    user.todoList = user.todoList.filter((todoItem) => todoItem._id.toString() !== todoItemId);
    return (await user.save());
}

module.exports = {
    findAUserByEmail,
    findAUserById,
    findAUserByIdAndPopulateTodoList,
    findAUserAndAddTodoItems,
    creatANewUser,
    deleteATodoItemInTodoList
}