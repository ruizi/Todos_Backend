const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const config = require('config');
const {userAuthService} = require('../services/authService');


// Route            GET api/auth
// Description      Test route
// Access           Public
router.get('/', async (req, res) => {
    res.status(200).json({test: 'auth routes'})
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

        const result = await userAuthService(email, password);
        return res.status(result.status).json(result.body);
    })

module.exports = router;