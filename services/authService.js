const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {settingReturnValue} = require('../utils/result');
const {findAUserByEmail} = require('../repositories/userRepository');

const userAuthService = async (email, password) => {
    try {
        const storedUser = await findAUserByEmail(email);
        if (!storedUser) {
            return settingReturnValue(200, {"message": "No such user or password is wrong"});
        }
        if (!await bcrypt.compare(password, storedUser.password)) {
            return settingReturnValue(403, {"message": "No such user or password is wrong"});
        }
        const token = jwt.sign(
            {userId: storedUser.id},
            config.get('jwt.JWT_SECRET'),
            {expiresIn: 360000},
        )
        return settingReturnValue(403, {"token": token});
    } catch (error) {
        console.log(error);
        return settingReturnValue(500, {"message": "Auth failed with internal error happened!"});
    }
}


module.exports = {
    userAuthService
}