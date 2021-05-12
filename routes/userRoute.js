const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')

// Route            Get api/users
// Description      Test route
// Access           Public
router.get('/', (req, res) => {
    res.send('user route')
})

// Route            POST api/users
// Description      User register
// Access           Public
// router.post('/register', [
//     check('email', "Please input a valid email address").isEmail,
//     check('username', "Please input your username").exists,
//     check('password', "Please input your password").exists
// ], (req, res) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//         res.status(400).error();
//     }
// })

module.exports = router;
