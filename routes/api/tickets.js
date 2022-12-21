const express = require('express')
const router = express.Router()

const Tickets = require('../../models/Tickets')

//test API
router.get('/test', (req, res) => res.send('tickets route testing!'));

//get all tickets
router.get('/allTickets', (req, res) => {
    Tickets.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.status(404).json({
        noticketsfound: 'No Tickets Found'
    }))
})

//get ticket by ID
router.get('/:id', (req, res) => {
    Tickets.findById(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(err => res.status(404).json({
        noticketsfound: 'No Tickets Found'
    }))
})

//create a ticket
router.post('/createTicket', (req, res) => {

})

module.exports = router