const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const config = require('config');


// Route            GET api/auth
// Description      Test route
// Access           Public
router.get('/', async (req, res) => {
    console.log(req.body);
    res.send('auth route')
})

// Route            POST api/auth
// Description      User auth route
// Access           Public
router.post('/',
    body('email', 'Please input a valid email address').isEmail(),
    body('password', 'please input password').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        try {
            const storedUser = await User.findOne({email: email});
            if (!storedUser) {
                return res.status(400).send("No such user or password is wrong");
            }
            if (!bcrypt.compare(password, storedUser.password)) {
                return res.status(401).send("No such user or password is wrong!");
            }

            //return jwt token to the user for future auth event.
            jwt.sign(
                {userId: storedUser.id},
                config.get('jwt.JWT_SECRET'),
                {expiresIn: 360000},
                (error, token) => {
                    if (error) {
                        console.log(error)
                        throw error;
                    }
                    res.status(200).json({token});
                }
            )
        } catch (error) {
            console.log(error)
            return res.status(500).json({errors: errors.array()});
        }
    })

module.exports = router;