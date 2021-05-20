const {settingReturnValue} = require('../utils/result');
const userRepository = require('../repositories/userRepository');
const todoItemRepository = require('../repositories/todoItemRepository');
const todoGroupRepository = require('../repositories/todoGroupRepository')

// Fetch todoGroup along with todoItems
const todoGroupFetchService = async (creatorId) => {
    try {
        const todoGroups = await todoGroupRepository.findAllGroupsByUserIdAndPopulate(creatorId)
        return settingReturnValue(200, {'todoGroups': todoGroups});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'something went wrong! try again later'})
    }
}


// create a new todoItem group
const todoGroupCreateService = async (creatorId, todoGroupName) => {
    try {
        const todoGroup = await todoGroupRepository.createANewTodoGroup(creatorId, todoGroupName);
        await userRepository.findAUserAndAddTodoGroup(creatorId, todoGroup._id);
        return settingReturnValue(200, {'todoGroup': todoGroup});
    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

// delete a todoItem group
const todoGroupDeleteService = async (creatorId, todoGroupId) => {
    try {
        // check if the operation is valid
        const user = await userRepository.findAUserById(creatorId);

        const isTodoGroupBelongsToUser = user.todoGroups.some((todoGroup) => {
            return todoGroup.toString() === todoGroupId;
        })

        if (!isTodoGroupBelongsToUser) {
            return settingReturnValue(403, {'message': 'Please use the right todoGroup ID'})
        }

        // Then, check if the group ID is correct or not
        const todoGroup = await todoGroupRepository.findGroupById(todoGroupId);

        if (!todoGroup) {
            return settingReturnValue(400, {'message': 'Please use the right todoGroup ID'})
        }

        // delete all todoItems belong to this group

        await todoItemRepository.deleteByGroupId(todoGroupId);

        // delete the group info in user

        const updatedUser = await userRepository.deleteAGroup(creatorId, todoGroupId);

        // delete the group

        await todoGroupRepository.deleteByGroupId(todoGroupId);

        // return the message
        return settingReturnValue(200, {'updatedUser': updatedUser});

    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {'message': 'Something went wrong! try again later'});
    }
}

module.exports = {
    todoGroupFetchService,
    todoGroupCreateService,
    todoGroupDeleteService,
}
