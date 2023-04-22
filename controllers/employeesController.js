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
})

module.exports = {
    getEmployee
}