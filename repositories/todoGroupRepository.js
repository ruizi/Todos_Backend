const TodoGroup = require('../model/TodoGroup');

const findGroupById = async (groupId) => {
    return (await TodoGroup.findOne({_id: groupId}));
}

const createANewTodoGroup = async (creatorId, newTodoGroupName) => {
    const newTodoGroupObj = new TodoGroup({
        owner: creatorId,
        groupName: newTodoGroupName,
    })
    return (await newTodoGroupObj.save());
}

const findTheGroupAndAddTodoItems = async (todoGroupId, newTodoItemId) => {
    const toBeUpdatedGroup = await TodoGroup.findOne({_id: todoGroupId})
    toBeUpdatedGroup.todoList.push(newTodoItemId);
    return (await toBeUpdatedGroup.save());
}
const deleteByGroupId = async (groupId) => {
    return (await TodoGroup.deleteOne({_id: groupId}));
}

const deleteATodoItemInATodoGroup = async (todoItem) => {
    const todoGroup = await TodoGroup.findOne({_id: todoItem.group})
    todoGroup.todoList.filter((todoItem) => {
        return todoItem !== todoItem._id;
    })
}

module.exports = {
    findGroupById,
    createANewTodoGroup,
    findTheGroupAndAddTodoItems,
    deleteByGroupId,
    deleteATodoItemInATodoGroup,
}