const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
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
// router.post('/', [
//         check('email', 'Please input a valid email address').isEmail,
//         check('password', 'please input password')].exists,
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({errors: errors.array()});
//         }
//
//
//
//     })

module.exports = router;