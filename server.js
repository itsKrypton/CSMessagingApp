const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT || 3500

app.use('/', express.static(path.join(__dirname, '/public'))) //Tells express where to look for static files

app.use('/', require('./routes/root'))
app.use('/allUsers', require('./routes/api/queries'))

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))