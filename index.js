const app = require('./app')
const port = process.env.PORT || 9000
const swagger = require('./swagger.js')

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
    swagger(app, port)
})

