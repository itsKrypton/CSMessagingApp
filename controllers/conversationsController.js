//const Users = require('../models/Users')
const Conversations = require('../models/Conversations')
const asyncHandler = require('express-async-handler')

// @desc Get conversation of user
// @route GET /users/conversation
// @access Private
const getConversation = asyncHandler(async (req, res) => {
    const { userID } = req.body

    const conversation = await Conversations.findOne({userID: userID})
    if(!conversation) {
        return res.status(400).json({ message: 'No conversation found'})
    }
    res.json(conversation.messages)
})

module.exports = {
    getConversation
}