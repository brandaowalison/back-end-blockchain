require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/db/connect')
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');
const usuarioRouter = require('./src/routes/usuario.route')


const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/usuario', usuarioRouter)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`)
        })
    } catch(error) {
        console.log(`Erro ao iniciar servidor em http://localhost:${PORT}`, error)
        process.exit(1)
    }
}

startServer()