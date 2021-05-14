const {settingReturnValue} = require('../utils/result');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {findAUserByEmail, findAUserByIdAndPopulateTodoList, creatANewUser} = require('../repositories/userRepository');

const userProfileService = async (userId) => {
    try {
        const userInfo = await findAUserByIdAndPopulateTodoList(userId);
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
        const userExist = await findAUserByEmail(email);
        if (userExist) {
            return settingReturnValue(401, {'message': 'Email already exist! Please use another email address!'});
        }
        // Get users gravatar
        const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
        const newUserObj = {
            email: email,
            username: username,
            password: await bcrypt.hash(password, 10),
            avatar: avatar
        }
        const newUser = await creatANewUser(newUserObj)
        console.log(newUser);
        return settingReturnValue(200, {'message': 'Successfully registered'});
    } catch (error) {
        console.log(error)
        return settingReturnValue(500, {'message': 'Something went happens,Please Try again later'});
    }

}

module.exports = {
    userProfileService,
    userRegisterService
}

