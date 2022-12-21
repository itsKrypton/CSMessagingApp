const Users = require('../models/Users')
const asyncHandler = require('express-async-handler')

// @desc Get specific user
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const { userID } = req.body

    if(!userID) {
        return res.status(400).json({ message: 'UserID is required'})
    }

    var user = await Users.findOne({userID: userID})

    // If user doesn't exist, create one
    if(!user) {
        const userObject = { userID }
        user = await Users.create(userObject)
    
        if(!user) { 
            return res.status(400).json({ message: 'Invalid user data received'})
        }
    }
    res.json(user)
})

module.exports = {
    getUser
}
