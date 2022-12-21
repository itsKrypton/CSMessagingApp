const mongoose = require('mongoose')

const EmployeesSchema = new mongoose.Schema({
    employeeID: {
        type: Number,
        required: true
    },
    assignedTickets: [{
        type: Number,
        default: null
    }]
})

const Employees = mongoose.model("employees", EmployeesSchema)
module.exports = Employees