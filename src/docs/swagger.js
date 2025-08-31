const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Plataforma Blockchain',
            version: '1.0.0',
            description: 'Documentação da API para gerenciamento da plataforma',
        },
        servers: [
            {
                url: 'http://localhost.com/'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = {
    swaggerUi,
    swaggerSpec
}