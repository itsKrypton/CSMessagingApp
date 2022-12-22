const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeesController')
const conversationsController = require('../../controllers/conversationsController')

router.route('/')
    .get(employeeController.getEmployee)
    .patch(conversationsController.attachEmpToConversation)

router.route('/conversation')
    .get(conversationsController.getAllConversations)
    .patch(conversationsController.updateEmpConversation)
    .delete(conversationsController.deleteConversation)

module.exports = router