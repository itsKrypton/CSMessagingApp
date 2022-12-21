const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public'))) //Tells express where to look for static files

app.use('/', require('./routes/root')) // This will take you to the homepage

app.use('/queries', require('./routes/api/queries')) // /queries would take you to routes/api

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }

    else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    }

    else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://CsMessagingApp:cs123messaging123app123@cluster0.knsc5up.mongodb.net/?retryWrites=true&w=majority')

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))