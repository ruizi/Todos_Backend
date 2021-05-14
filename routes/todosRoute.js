const express = require('express');
const router = express.Router();
const is_auth = require('../middleware/is_auth');
const {body, validationResult} = require('express-validator');
const {
    todosFetchService,
    createTodoItemService,
    updateTodoItemService,
    deleteTodoItemService
} = require('../services/todosService');

// @route   GET api/todos
// @desc    Fetching all todoItems belong to the login user.
// @access  Private
router.get('/', is_auth, async (req, res) => {
    const creatorId = req['userId'];
    const returnValue = await todosFetchService(creatorId);
    return res.status(returnValue.status).json(returnValue.body);
})

// @route   POST api/todos/create
// @desc    Create a new todoItem
// @access  Private
router.post('/create',
    is_auth,
    body('title', 'Please input title of the new todoItem').isEmpty().not(),
    body('scheduleAt', 'Please input the schedule finish date of the new todoItem').isEmpty().not(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors) {
            return res.status(400).json({errors: errors})
        }
        const creatorId = req['userId'];
        const todoItemInfo = req.body;
        const returnValue = await createTodoItemService(creatorId, todoItemInfo);
        return res.status(returnValue.status).json(returnValue.body);
    })

// @route   PUT api/todos/update
// @desc    update the todoItem.
// @access  Private
router.put('/update',
    is_auth,
    body('title', 'Please input title of the new todoItem').isEmpty().not(),
    body('scheduleAt', 'Please input the schedule finish date of the new todoItem').isEmpty().not(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors) {
            return res.status(400).json({errors: errors})
        }
        const newTodoItemInfo = req.body;
        const returnValue = await updateTodoItemService(newTodoItemInfo);
        return res.status(returnValue.status).json(returnValue.body);
    })

// @route   DELETE api/todos/delete/:todo_id
// @desc    delete a todoItem.
// @access  Private

router.delete('/delete/:todo_id', is_auth, async (req, res) => {
    // firstly, need to verify if the ongoing delete todos belongs to the auth user.
    const userId = req['userId'];
    const returnValue = await deleteTodoItemService(userId, req.params.todo_id);
    return res.status(returnValue.status).json(returnValue.body);
})

module.exports = router;