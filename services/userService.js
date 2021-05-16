const {settingReturnValue} = require('../utils/result');
const userRepository = require('../repositories/userRepository');
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
        return settingReturnValue(200, {'newUser': newUser});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'Something went happens,Please Try again later'});
    }

}

module.exports = {
    userProfileService,
    userRegisterService
}

