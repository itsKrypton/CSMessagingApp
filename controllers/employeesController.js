const Employees = require('../models/Employees')
const asyncHandler = require('express-async-handler')

// @desc Get specific employee
// @route GET /employees
// @access Private
const getEmployee = asyncHandler(async (req, res) => {
    const { employeeID } = req.body

    if(!employeeID) {
        return res.status(400).json({ message: 'EmployeeID is required'})
    }

    var employee = await Employees.findOne({employeeID: employeeID})

    // If employee doesn't exist, create one
    if(!employee) {
        const employeeObject = { employeeID }
        employee = await Employees.create(employeeObject)
    
        if(!employee) { 
            return res.status(400).json({ message: 'Invalid employee data received'})
        }
    }
    res.json(employee)
})

module.exports = {
    getEmployee
}