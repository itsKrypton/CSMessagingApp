const Employees = require('../models/Employees')
const asyncHandler = require('express-async-handler')

// @desc Get specific employee
// @route GET /employees/(:employeeID)
// @access Private
const getEmployee = asyncHandler(async (req, res) => {
    const employeeID = req.params.employeeID.trim()
    if(!employeeID) {
        return res.status(400).json({ message: 'EmployeeID is required'})
    }

    Employees.findOne({ employeeID }, async (err, employee) => {
        if(err) {
            return res.status(500).json({ message: err.message });
        }

        if(!employee) {
            const employeeObject = { employeeID }
            let newEmployee
            try {
                newEmployee = await Employees.create(employeeObject)
            }
            catch (err) {
                return res.status(400).json({ message: err.message })
            }

            return res.json(newEmployee)
        }

        res.json(employee)
    })
    /* var employee = await Employees.findOne({employeeID: req.query.employeeID})

    // If employee doesn't exist, create one
    if(!employee) {
        const employeeID = req.query.employeeID
        const employeeObject = { employeeID }
        employee = await Employees.create(employeeObject)
    
        if(!employee) { 
            return res.status(400).json({ message: 'Invalid employee data received'})
        }
    }
    res.json(employee) */
})

module.exports = {
    getEmployee
}