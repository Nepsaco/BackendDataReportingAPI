const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const bodyParser = require('body-parser')
const swagger = require('./swagger.js')
const movieRouter = require('./routes/movie')

app.use(bodyParser.json())

app.use(movieRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Data Reporting project!')
})

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
    swagger(app, port)
})
