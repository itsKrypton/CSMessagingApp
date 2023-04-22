const express = require('express')
const router = express.Router()
const employeeController = require('../../controllers/employeesController')
const conversationsController = require('../../controllers/conversationsController')

// /employees/employeeID will be routed here
router.route('/:employeeID')
    .get(employeeController.getEmployee)
    .post(conversationsController.attachEmpToConversation) 
    .patch(conversationsController.unattachEmpFromConversation) 

router.route('/unattach').patch(conversationsController.unattachEmpFromConversation)

module.exports = router