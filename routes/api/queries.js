const express = require('express')
const router = express.Router()

const Queries = require('../../models/UserQueries')

//test API
router.get('/test', (req, res) => res.send('queries route testing!'));

//get all queries
router.get('/', (req, res) => {
    Queries.find()
    .then(queries => res.json(queries))
    .catch(err => res.status(404).json({
        noquriesfound: 'No Queries Found'
    }))
})

module.exports = router