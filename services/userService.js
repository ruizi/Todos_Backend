const {settingReturnValue} = require('../utils/result');
const userRepository = require('../repositories/userRepository');
const todoGroupRepository = require('../repositories/todoGroupRepository');
//const {findAUserByEmail, findAUserByIdAndPopulateTodoList, creatANewUser} = require('../repositories/userRepository');

const userProfileService = async (userId) => {
    try {
        const userInfo = await userRepository.findAUserByIdAndPopulate(userId);
        if (!userInfo) {
            return settingReturnValue(401, {'message': 'No such user profile!'});
        }
        return settingReturnValue(200, {'profile': userInfo});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'Something went wrong! try again later.'});
    }
}

const userRegisterService = async (email, username, password) => {
    try {
        const userExist = await userRepository.findAUserByEmail(email);
        if (userExist) {
            return settingReturnValue(401, {'message': 'Email already exist! Please use another email address!'});
        }

        const newUser = await userRepository.creatANewUser(email, username, password);
        // create up two initial todoGroups which is will apply to every user
        const todoItemGroups = ['Today', 'Important'];
        for (const todoItemGroup of todoItemGroups) {
            console.log(todoItemGroup)
            console.log(newUser)
            const todoGroup = await todoGroupRepository.createANewTodoGroup(newUser._id, todoItemGroup);
            console.log(todoGroup)
            await userRepository.findAUserAndAddTodoGroup(newUser._id, todoGroup._id);
        }
        return settingReturnValue(200, {'newUserCreated': 'success'});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'Something went happens,Please Try again later'});
    }

}

module.exports = {
    userProfileService,
    userRegisterService
}

