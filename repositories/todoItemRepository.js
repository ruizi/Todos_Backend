const User = require('../model/User');
const TodoItem = require('../model/TodoItem');

const findTodoItemsByCreatorId = async (creatorId) => {
    return (await TodoItem.find({creator: creatorId}));
}

const findTodoItemsByTodoId = async (todoId) => {
    return (await TodoItem.findById({_id: todoId}));
}

const createANewTodoItem = async (todoItemObj) => {
    return (await new TodoItem(todoItemObj).save());
}

const findTodoItemByIdAndUpdate = async (todoItemId, updatedTodoItemObj) => {
    return (await TodoItem.findByIdAndUpdate(todoItemId, updatedTodoItemObj, {new: true}));
}

const deleteATodoItemFromCollection = async (todoId) => {
    return (await TodoItem.deleteOne({_id: todoId}));
}

const deleteByGroupId = async (groupId) => {
    return (await TodoItem.deleteMany({group: groupId}));
}


module.exports = {
    findTodoItemsByCreatorId,
    findTodoItemsByTodoId,
    createANewTodoItem,
    findTodoItemByIdAndUpdate,
    deleteATodoItemFromCollection,
    deleteByGroupId,
}