//const Users = require('../models/Users')
const Conversations = require('../models/Conversations')
const asyncHandler = require('express-async-handler')
const Employees = require('../models/Employees')
const impKeywords = ["payment", "loan", "fees", "salary", "amount"]

// @desc Get conversation of user
// @route GET /conversations/(:userID)
// @access Private
const getConversation = asyncHandler(async (req, res) => {
    const userID = req.params.userID.trim()
    if(!userID) {
        return res.status(400).json({ message: 'UserID is required'})
    }

    const conversation = await Conversations.findOne({ userID })
    if(!conversation) {
        return res.json([{ message: 'No conversation found'}])
    }
    res.json(conversation)
})

// @desc Get conversations of all users
// @route GET /conversations
// @access Private
const getAllConversations = asyncHandler(async (req, res) => {
    const conversations = await Conversations.find()
    if(!conversations?.length) {
        return res.status(400).json({ message: 'No conversation found'})
    }
    res.json(conversations)
})

// @desc Initiates and updates conversation of user
// @route POST /conversations/(:userID)
// @access Private
const initiateUpdateConversation = asyncHandler(async (req, res) => {
    const userID = req.params.userID.trim()
    const { date, message } = req.body

    if(!message) {
        return res.status(400).json({ message: 'Message field cannot be empty'})
    }

    let conversation = await Conversations.findOne({ userID })
    const newMessageObject = { "sender": "Client", "message": message, "date": date }
    if(conversation) { // Conversation already exists so we simply add the new message into it.
        conversation.messages.push(newMessageObject)
        
        if(!conversation.isImportant)
        {
            const containsWord = impKeywords.some(word => message.includes(word))
            if(containsWord) {
                conversation.isImportant = true
            }
        }

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
// @route POST /employees/(:employeeID)
// @access Private
const attachEmpToConversation = asyncHandler(async (req, res) => {
    const employeeID = req.params.employeeID.trim()
    const { userID } = req.body

    const conversation = await Conversations.findOne({userID: userID})
    if(!conversation) {
        return res.status(400).json({ message: 'No conversation found'})
    }
    conversation.employeeID = employeeID;
    conversation.save()

    const employee = await Employees.findOne({"employeeID": employeeID})
    if(!employee) {
        return res.status(400).json({ message: 'No employee found'})
    }
    employee.assignedTickets.push(userID)
    employee.save()

    return res.json(conversation)
})

// @desc unattaches employee from conversation 
// @route PATCH /employees/(:employeeID)
// @access Private
const unattachEmpFromConversation = asyncHandler(async (req, res) => {
    const employeeID = req.params.employeeID.trim()
    const { userID } = req.body

    const conversation = await Conversations.findOne({ userID })
    conversation.employeeID = null;
    conversation.save()

    const employee = await Employees.findOne({ employeeID })
    employee.assignedTickets.pull(userID)
    employee.save()

    return res.json(conversation)
})

// @desc Updates conversation of employee 
// @route PATCH /conversations
// @access Private
const updateEmpConversation = asyncHandler(async (req, res) => {
    const { userID, employeeID, date, message } = req.body

    if(!message) {
        return res.status(400).json({ message: 'Message field cannot be empty'})
    }

    if(!employeeID) {
        return res.status(400).json({ message: 'Invalid data'})
    }

    const conversation = await Conversations.findOne({userID: userID})

    if(conversation?.employeeID === null || conversation?.employeeID !== employeeID) {
        return res.status(400).json( { message: 'This employee is not assigned to the ticket'})
    }

    const newMessageObject = {"sender": "Support", "message": message, "date": date}
    conversation.messages.push(newMessageObject)

    if(!conversation.isImportant)
    {
        const containsWord = impKeywords.some(word => message.includes(word))
        if(containsWord) {
            conversation.isImportant = true
        }
    }

    conversation.save()

    return res.json(conversation)
})

// @desc Deletes a conversation
// @route DELETE /conversations
// @access Private
const deleteConversation = asyncHandler(async (req, res) => {
    const { userID, employeeID } = req.body

    const result = await Conversations.findOneAndDelete({userID: userID})
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
    unattachEmpFromConversation,
    updateEmpConversation,
    deleteConversation
}