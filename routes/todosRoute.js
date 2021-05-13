const express = require('express');
const router = express.Router();
const TodoItem = require('../model/TodoItem');
const User = require('../model/User');
const is_auth = require('../middleware/is_auth');
const {body, validationResult} = require('express-validator');

// @route   GET api/todos
// @desc    Fetching all todoItems belong to the login user.
// @access  Private
router.get('/', is_auth, async (req, res) => {
    try {
        const creatorId = req['userId'];

        const todoItems = await TodoItem.find({creator: creatorId});
        console.log(todoItems);

        return res.status(200).json({todoItems});
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong! try again later')
    }

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
        try {
            const creatorId = req['userId'];

            const {title, subTitle, description, scheduleAt, repeatCircle} = req.body;

            const newTodoItem = new TodoItem({
                creator: creatorId,
                title: title,
                subTitle: subTitle,
                description: description,
                isFinished: false,
                createAt: new Date(),
                scheduleAt: scheduleAt,
                repeatCircle: repeatCircle,
            });
            const todoItem = await newTodoItem.save();
            const creator = await User.findOne({_id: creatorId});
            creator.todoList.push(todoItem._id);
            await creator.save();
            res.status(200).json({todoItem});
        } catch (error) {
            console.log(error)
            return res.status(500).send('Something went wrong! try again later')
        }
    })

// @route   PUT api/todos/update
// @desc    update the todoItem.
// @access  Private
router.put('/update', is_auth, async (req, res) => {
    try {
        const {
            _id,
            title,
            subTitle,
            description,
            isFinished,
            scheduleAt,
            repeatCircle
        } = req.body;
        const updatedTodo = await TodoItem.findByIdAndUpdate(_id, {
            title: title,
            subTitle: subTitle,
            description: description,
            isFinished: isFinished,
            scheduleAt: scheduleAt,
            repeatCircle: repeatCircle
        }, {new: true})
        return res.status(200).json(updatedTodo);
    } catch (error) {
        console.log(error);
        return res.status(200).send('Update error')
    }
})

// @route   DELETE api/todos/delete/:todo_id
// @desc    delete a todoItem.
// @access  Private

router.delete('/delete/:todo_id', is_auth, async (req, res) => {
    // firstly, need to verify if the ongoing delete todos belongs to the auth user.
    const userId = req['userId'];
    const user = await User.findOne({_id: userId});
    const isTodoItemBelongToUser = user.todoList.some((todoItem) => {
        return todoItem._id.toString() === req.params.todo_id;
    })

    if (!isTodoItemBelongToUser) {
        return res.status(400).send('Please use the right todoItem ID');
    }

    // Then, check if the todoItem ID is correct or not
    const todoItem = await TodoItem.findOne({_id: req.params.todo_id});
    if (!todoItem) {
        return res.status(400).send('No such todo ')
    }

    // Delete the todoInfo from User document
    user.todoList = user.todoList.filter((todoItem) => todoItem._id.toString() !== req.params.todo_id);
    await user.save();

    // delete the todoItem from TodoItem collection
    const result = await TodoItem.deleteOne({_id: req.params.todo_id})

    return res.status(200).json(user.todoList);
})

module.exports = router;