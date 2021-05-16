const express = require('express');
const router = express.Router();
const is_auth = require('../middleware/is_auth');
const {body, validationResult} = require('express-validator');

const todoGroupService = require('../services/todoGroupService');


// @route   POST api/group
// @desc    Create a new todoItem group
// @access  Private
router.post('/', is_auth,
    body('groupName', 'Please input group name of the new todoGroup').isEmpty().not(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors) {
            return res.status(400).json({errors: errors})
        }
        const creatorId = req['userId'];
        const {groupName} = req.body;
        const returnValue = await todoGroupService.todoGroupCreateService(creatorId, groupName);
        return res.status(returnValue.status).json(returnValue.body);
    })

// @route   DELETE api/group
// @desc    Delete a todoItem group
// @access  Private
router.delete('/:group_Id', is_auth,
    async (req, res) => {
        const userId = req['userId'];
        const returnValue = await todoGroupService.todoGroupDeleteService(userId, req.params.group_Id);
        return res.status(returnValue.status).json(returnValue.body);
    })

module.exports = router;