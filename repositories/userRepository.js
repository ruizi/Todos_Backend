const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const findAUserByEmail = async email => {
    return (await User.findOne({email: email}));
}

const findAUserById = async (userId) => {
    return (await User.findOne({_id: userId}));
}

const findAUserByIdAndPopulate = async (userId) => {

    return (await User.findOne({_id: userId}).select('-password').populate({
        path: 'todoGroups', //populate todoGroups
        populate: {
            path: 'todoList' //in todoGroup, populate todolist
        }
    }));
}

const findAUserAndAddTodoItems = async (userId, newTodoItemId) => {
    const creator = await User.findOne({_id: userId});
    creator.todoList.push(newTodoItemId);
    return (await creator.save());
}

const findAUserAndAddTodoGroup = async (userId, newTodoGroupId) => {
    const creator = await User.findOne({_id: userId});
    creator.todoGroups.push(newTodoGroupId);
    return (await creator.save());
}

const creatANewUser = async (email, username, password) => {
    const newUserObj = {
        email: email,
        username: username,
        password: await bcrypt.hash(password, 10),
        avatar: gravatar.url(email, {s: '200', r: 'pg', d: 'mm'}),
    }
    return (await new User(newUserObj).save());
}

const deleteAGroup = async (userId, groupId) => {
    const user = await User.findOne({_id: userId});
    console.log(user)
    user.todoGroups = user.todoGroups.filter((group) => group.toString() !== groupId);
    return (await user.save());
}

module.exports = {
    findAUserByEmail,
    findAUserById,
    findAUserByIdAndPopulate,
    findAUserAndAddTodoItems,
    findAUserAndAddTodoGroup,
    creatANewUser,
    deleteAGroup,
}