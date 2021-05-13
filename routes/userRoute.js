const express = require('express');
const gravatar = require('gravatar');
const {body, validationResult} = require("express-validator");
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const is_auth = require('../middleware/is_auth');

// Route            Get api/user/profile
// Description      Get the user's profile info
// Access           Private
router.get('/profile', is_auth, async (req, res) => {
    try {
        const userId = req['userId'];

        const userInfo = await User.findOne({_id: userId}).select('-password').populate('todoList');

        return res.json(userInfo);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Something went wrong! try again later.')
    }


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
        try {
            const userExist = await User.findOne({email: email});
            if (userExist) {
                return res.status(400).send('Email already exist! Please use another email address!');
            }
            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            const newUser = new User({
                email: email,
                username: username,
                password: await bcrypt.hash(password, 10),
                avatar: avatar
            })

            await newUser.save()

            return res.status(200).send('Successfully registered')

        } catch (error) {
            console.log(error)
            return res.status(500).send("Something wrong happens in server :(, Try again later")
        }

    })

module.exports = router;
