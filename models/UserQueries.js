const mongoose = require('mongoose')

const QueriesSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
})

const UserQueries = mongoose.model("userQueries", QueriesSchema)
module.exports = UserQueries