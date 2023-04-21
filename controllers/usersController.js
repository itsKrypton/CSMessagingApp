const Users = require('../models/Users')
const asyncHandler = require('express-async-handler')

// @desc Get specific user
// @route GET /users/(:userID)
// @access Private
const getUser = asyncHandler(async (req, res) => {
    const userID = req.params.userID.trim()
    if(!userID) {
        return res.status(400).json({ message: 'UserID is required'})
    }

    Users.findOne({ userID }, async (err, user) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        }
        if(!user) {
            const userObject = { userID }
            let newUser
            try {
                newUser = await Users.create(userObject)
            }
            catch (err) {
                return res.status(400).json({ message: err.message })
            }

            return res.json(newUser)
        }
        res.json(user);
    })
})

module.exports = {
    getUser
}
