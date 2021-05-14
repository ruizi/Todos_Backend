const express = require('express');
const {body, validationResult} = require("express-validator");
const router = express.Router();
const is_auth = require('../middleware/is_auth');
const {userProfileService, userRegisterService} = require('../services/userService');

// Route            Get api/user/profile
// Description      Get the user's profile info
// Access           Private
router.get('/profile', is_auth, async (req, res) => {
    const userId = req['userId'];
    const returnValue = await userProfileService(userId);
    return res.status(returnValue.status).json(returnValue.body);
})

// Route            POST api/user/
// Description      User register
// Access           Public
router.post('/register',
    body('email', "Please input a valid email address").isEmail(),
    body('username', "Please input your username").exists(),
    body('password', "Password should be more than 6 chars").isLength({min: 6}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, username, password} = req.body;
        const returnValue = await userRegisterService(email, username, password);
        return res.status(returnValue.status).json(returnValue.body);
    })

module.exports = router;
