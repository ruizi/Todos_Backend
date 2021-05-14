const returnValue = {
    "status": 200,
    "body": {},
};

const settingReturnValue = (status, body) => {
    returnValue.status = status;
    returnValue.body = body;
    return returnValue;
};

module.exports = {
    settingReturnValue
}