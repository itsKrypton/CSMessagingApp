const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const conversationsController = require('../../controllers/conversationsController')

// /users/userID will be routed here
router.route('/:userID').get(usersController.getUser)

module.exports = router