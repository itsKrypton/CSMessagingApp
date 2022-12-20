const express = require('express')
const router = express.Router()

const Queries = require('../../models/UserQueries')

//test API
router.get('/test', (req, res) => res.send('queries route testing!'));

//get all queries
router.get('/allQueries', (req, res) => {
    Queries.find()
    .then(queries => res.json(queries))
    .catch(err => res.status(404).json({
        noquriesfound: 'No Queries Found'
    }))
})

//get query by ID
router.get('/:id', (req, res) => {
    Queries.findById(req.params.id)
    .then(query => res.json(query))
    .catch(err => res.status(404).json({
        noquriesfound: 'No Queries Found'
    }))
})

//create a query
router.post('/createQuery', (req, res) => {

})

module.exports = router