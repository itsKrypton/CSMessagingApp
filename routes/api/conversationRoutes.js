const express = require('express')
const router = express.Router()
const conversationsController = require('../../controllers/conversationsController')

router.route('/')
    .get(conversationsController.getAllConversations)
    .patch(conversationsController.updateEmpConversation)
    .delete(conversationsController.deleteConversation)

router.route('/:userID')
    .get(conversationsController.getConversation)
    .post(conversationsController.initiateUpdateConversation)

module.exports = router