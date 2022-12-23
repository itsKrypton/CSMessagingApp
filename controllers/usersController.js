const Users = require('../models/Users')
const asyncHandler = require('express-async-handler')

// @desc Get specific user
// @route GET /users/?userID=(Number)
// @access Private
const getUser = asyncHandler(async (req, res) => {

    if(!req.query.userID) {
        return res.status(400).json({ message: 'UserID is required'})
    }

    var user = await Users.find({userID: req.query.userID})

    // If user doesn't exist, create one
    if(!user?.length) {
        const userID = req.query.userID
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
