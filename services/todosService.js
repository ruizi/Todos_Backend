const {settingReturnValue} = require('../utils/result');
//const {findAUserById, findAUserAndAddTodoItems, deleteATodoItemInTodoList} = require('../repositories/userRepository');
const userRepository = require('../repositories/userRepository');
// const {
//     findTodoItemsByCreatorId,
//     findTodoItemsByTodoId,
//     createANewTodoItem,
//     findTodoItemByIdAndUpdate,
//     deleteATodoItemFromCollection
// } = require('../repositories/todoItemRepository');
const todoItemRepository = require('../repositories/todoItemRepository');


const todosFetchService = async (creatorId) => {
    try {
        const todoItems = await todoItemRepository.findTodoItemsByCreatorId(creatorId);
        return settingReturnValue(200, {'todoItems': todoItems});
    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

const createTodoItemService = async (creatorId, todoItemInfo) => {
    try {
        const {title, subTitle, description, scheduleAt, repeatCircle} = todoItemInfo;
        const newTodoItem = {
            creator: creatorId,
            title: title,
            subTitle: subTitle,
            description: description,
            isFinished: false,
            createAt: new Date(),
            scheduleAt: scheduleAt,
            repeatCircle: repeatCircle,
        };

        const todoItem = await todoItemRepository.createANewTodoItem(newTodoItem);

        await userRepository.findAUserAndAddTodoItems(creatorId, todoItem._id);

        return settingReturnValue(200, {'newTodoItem': todoItem});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

const updateTodoItemService = async (creatorId, newTodoItemInfo) => {
    try {
        const user = await userRepository.findAUserById(creatorId);
        console.log(user)
        const isTodoItemBelongToUser = user.todoList.some((todoItem) => {
            return todoItem.toString() === newTodoItemInfo._id;
        })

        if (!isTodoItemBelongToUser) {
            return settingReturnValue(403, {'message': 'Please use the right todoItem ID'})
        }

        const {
            _id,
            title,
            subTitle,
            description,
            isFinished,
            scheduleAt,
            repeatCircle
        } = newTodoItemInfo;

        const updatedTodoObj = {
            title: title,
            subTitle: subTitle,
            description: description,
            isFinished: isFinished,
            scheduleAt: scheduleAt,
            repeatCircle: repeatCircle
        }

        await todoItemRepository.findTodoItemByIdAndUpdate(_id, updatedTodoObj);

        const updatedTodoItem = await todoItemRepository.findTodoItemsByTodoId(_id);

        return settingReturnValue(200, {'updatedTodoItem': updatedTodoItem})

    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

const deleteTodoItemService = async (userId, todoId) => {
    try {
        const user = await userRepository.findAUserById(userId);

        const isTodoItemBelongToUser = user.todoList.some((todoItem) => {
            return todoItem.toString() === todoId;
        })

        if (!isTodoItemBelongToUser) {
            return settingReturnValue(403, {'message': 'Please use the right todoItem ID'})
        }

        // Then, check if the todoItem ID is correct or not
        const todoItem = await todoItemRepository.findTodoItemsByTodoId(todoId);
        if (!todoItem) {
            return settingReturnValue(400, {'message': 'Please use the right todoItem ID'})
        }

        // Delete the todoInfo from User document
        await userRepository.deleteATodoItemInTodoList(userId, todoId);

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