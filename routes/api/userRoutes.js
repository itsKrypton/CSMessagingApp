const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const conversationsController = require('../../controllers/conversationsController')

router.route('/').get(usersController.getUser)

router.route('/conversation').get(conversationsController.getConversation)

module.exports = router