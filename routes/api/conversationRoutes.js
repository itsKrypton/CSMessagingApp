const express = require('express')
const router = express.Router()
const conversationsController = require('../../controllers/conversationsController')

// /employees/employeeID will be routed here
router.route('/')
    .get(conversationsController.getAllConversations)
    .patch(conversationsController.updateEmpConversation)
    .delete(conversationsController.deleteConversation)

router.route('/:userID')
    .get(conversationsController.getConversation)
    .post(conversationsController.initiateUpdateConversation)

/* router.route('/:employeeID')
    .get(employeeController.getEmployee)
    .patch(conversationsController.attachEmpToConversation)

router.route('/conversation')
    .get(conversationsController.getAllConversations)
    .patch(conversationsController.updateEmpConversation)
    .delete(conversationsController.deleteConversation)

router.route('/unattach')
    .patch(conversationsController.unattachEmpFromConversation) */

module.exports = router