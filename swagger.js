const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        info: {
            title: 'Movie API',
            version: '1.0.0',
        }
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

const swaggerDocs = (app, port) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.use('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

module.exports = swaggerDocs
