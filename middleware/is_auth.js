const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // the token stored in the reqs header field.
    const jwtToken = req.header('x-auth-token');
    if (!jwtToken || jwtToken === '') {
        return res.status(401).send('jwt token missed, please login again.')
    }

    try {
        const decodedToken = jwt.verify(jwtToken, config.get('jwt.JWT_SECRET'));
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send('JWT token error. Please try again later!')
    }
}