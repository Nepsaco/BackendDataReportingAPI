const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const movieRouter = require('./routes/movie')

app.use(bodyParser.json())
app.use(movieRouter)

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Data Reporting project!')
})

module.exports = app
