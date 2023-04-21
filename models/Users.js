const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v >= 0,
            message: props => `${props.value} is not a valid userID. Must be a positive number`
        }
    }
})

const Users = mongoose.model('users', UsersSchema)
module.exports = Users