const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true
    }
})

const Users = mongoose.model('users', UsersSchema)
module.exports = Users