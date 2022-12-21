const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const ConversationsSchema = new mongoose.Schema({
    messages: [MessageSchema], // Here we are making an array of MessageSchema as the a single message would contain the sender of the message, i.e client or sender and the message itself.
    userID: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Users'
    },
    employeeID: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Employees'
    }
})

const Conversations = mongoose.model("conversations", ConversationsSchema)
module.exports = Conversations