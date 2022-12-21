const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const TicketsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Users'
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    assignedTo: {
        type: Number,
        default: null
    },
    isImportant: {
        type: Boolean,
        default: false
    }
})

TicketsSchema.plugin(AutoIncrement, {
    inc_field: 'ticketID',
    id: 'ticketNums',
    start_seq: 10
})

const Tickets = mongoose.model("tickets", TicketsSchema)
module.exports = Tickets