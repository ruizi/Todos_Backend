const express = require('express');
const router = express.Router();

// @route   Get api/todos
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
    res.send('todos route')
})

module.exports = router;