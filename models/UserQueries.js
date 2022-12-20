const mongoose = require('mongoose')

const QueriesSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
})

const queryModel = mongoose.model("userQueries", QueriesSchema)
module.exports = queryModel