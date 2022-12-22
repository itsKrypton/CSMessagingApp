//const Users = require('../models/Users')
const Conversations = require('../models/Conversations')
const asyncHandler = require('express-async-handler')
const Employees = require('../models/Employees')

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

// @desc Get conversations of all users
// @route GET /employees/conversation
// @access Private
const getAllConversations = asyncHandler(async (req, res) => {
    const conversations = await Conversations.find()
    if(!conversations?.length) {
        return res.status(400).json({ message: 'No conversation found'})
    }
    res.json(conversations)
})

// @desc Initiates and updates conversation of user
// @route POST /users/conversation
// @access Private
const initiateUpdateConversation = asyncHandler(async (req, res) => {
    const { userID, date, message } = req.body

    if(!message) {
        return res.status(400).json({ message: 'Message field cannot be empty'})
    }

    let conversation = await Conversations.findOne({userID: userID})
    const newMessageObject = {"sender": "Client", "message": message, "date": date}
    if(conversation) { // Conversation already exists so we simply add the new message into it.
        conversation.messages.push(newMessageObject)
        conversation.save()
    }

    else {
        const conversationObject = {"messages": newMessageObject, userID}
        conversation = await Conversations.create(conversationObject)

        if(!conversation) { 
            return res.status(400).json({ message: 'Invalid conversation data received'})
        }
    }

    return res.json(conversation)
})

// @desc Attaches employee to conversation 
// @route PATCH /employees
// @access Private
const attachEmpToConversation = asyncHandler(async (req, res) => {
    const { userID, employeeID } = req.body

    const conversation = await Conversations.findOne({userID: userID})
    conversation.employeeID = employeeID;
    conversation.save()

    const employee = await Employees.findOne({"employeeID": employeeID})
    employee.assignedTickets.push(userID)
    employee.save()

    return res.json(conversation)
})

// @desc Updates conversation of employee 
// @route PATCH /employees/conversation
// @access Private
const updateEmpConversation = asyncHandler(async (req, res) => {
    const { userID, date, message } = req.body

    if(!message) {
        return res.status(400).json({ message: 'Message field cannot be empty'})
    }

    const conversation = await Conversations.findOne({userID: userID})
    const newMessageObject = {"sender": "Support", "message": message, "date": date}
    conversation.messages.push(newMessageObject)
    conversation.save()

    return res.json(conversation)
})

// @desc Deletes a conversation
// @route DELETE /employees/conversation
// @access Private
const deleteConversation = asyncHandler(async (req, res) => {
    const { userID, employeeID } = req.body

    const result = await Conversations.findOneAndDelete({"userID": userID})
    const reply = `Ticket of User ID: ${result.userID} has been deleted by ${result.employeeID}`

    const employee = await Employees.findOne({"employeeID": employeeID})
    employee.assignedTickets.pull(userID)
    employee.save()

    res.json(reply)
})

module.exports = {
    getConversation,
    getAllConversations,
    initiateUpdateConversation,
    attachEmpToConversation,
    updateEmpConversation,
    deleteConversation
}