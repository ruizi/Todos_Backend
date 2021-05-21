const {settingReturnValue} = require('../utils/result');
const userRepository = require('../repositories/userRepository');
const todoItemRepository = require('../repositories/todoItemRepository');
const todoGroupRepository = require('../repositories/todoGroupRepository')

// fetch all todoItems created by user
const todosFetchService = async (creatorId) => {
    try {
        const todoItems = await todoItemRepository.findTodoItemsByCreatorId(creatorId);
        return settingReturnValue(200, {'todoItems': todoItems});
    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

// creat a new TodoItem
const createTodoItemService = async (creatorId, todoItemInfo) => {
    try {
        const {groupId, title, subTitle, description, scheduleAt, repeatCircle} = todoItemInfo;
        const newTodoItem = {
            creator: creatorId,
            group: groupId,
            title: title,
            subTitle: subTitle,
            description: description,
            isFinished: false,
            createAt: new Date(),
            scheduleAt: scheduleAt,
            repeatCircle: repeatCircle,
        };

        const todoItem = await todoItemRepository.createANewTodoItem(newTodoItem);
        await todoGroupRepository.findTheGroupAndAddTodoItems(groupId, todoItem._id);
        console.log(todoItem)
        return settingReturnValue(200, {'newTodoItem': todoItem});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

const updateTodoItemService = async (creatorId, newTodoItemInfo) => {
    try {
        const {
            _id,
            group,
            title,
            subTitle,
            description,
            isFinished,
            scheduleAt,
            repeatCircle
        } = newTodoItemInfo;

        const theTodoItem = await todoItemRepository.findTodoItemsByTodoId(_id);
        if (theTodoItem.creator.toString() !== creatorId) {
            return settingReturnValue(403, {'message': 'Please use the right todoItem ID'})
        }

        const updatedTodoObj = {
            title: title,
            subTitle: subTitle,
            description: description,
            isFinished: isFinished,
            scheduleAt: scheduleAt,
            repeatCircle: repeatCircle,
            group: group
        }

        const updatedTodoItem = await todoItemRepository.findTodoItemByIdAndUpdate(_id, updatedTodoObj);
        console.log(updatedTodoItem)
        // const updatedTodoItem = await todoItemRepository.findTodoItemsByTodoId(_id);

        return settingReturnValue(200, {'updatedTodoItem': updatedTodoItem})

    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

const deleteTodoItemService = async (userId, todoId) => {
    try {
        // firstly, need to verify if the ongoing delete todos is valid and belongs to the auth user.
        const theTodoItem = await todoItemRepository.findTodoItemsByTodoId(todoId);
        if (!theTodoItem) {
            return settingReturnValue(400, {'message': 'Please use the right todoItem ID'})
        }
        if (theTodoItem.creator.toString() !== userId) {
            return settingReturnValue(403, {'message': 'Please use the right todoItem ID'})
        }

        // Delete the todoInfo from a User's todoGroup
        await todoGroupRepository.deleteATodoItemInATodoGroup(theTodoItem)

        // delete the todoItem from TodoItem collection
        await todoItemRepository.deleteATodoItemFromCollection(todoId);
        return settingReturnValue(200, {'message': 'TodoItem delete successfully'})
    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }

}

module.exports = {
    todosFetchService,
    createTodoItemService,
    updateTodoItemService,
    deleteTodoItemService,
}