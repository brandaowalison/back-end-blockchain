require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/db/connect')
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');
const usuarioRouter = require('./src/router/usuario.route')
const ConsumoRouter = require('./src/router/consumoE.route')
const CreditoRouter = require('./src/router/creditoC.route')
const EmissaoRouter = require('./src/router/emissao.route')
const FonteEmissaoRouter = require('./src/router/fonteEmissao.route')
const FrotaVeiculoRouter = require('./src/router/frotaVeiculo.route')
const TransacaoCompensacaoRouter = require('./src/router/transacao.route')
const ProjetoEnergeticoRouter = require('./src/router/projeto.route')


const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/usuario', usuarioRouter)
app.use('/api/Consumo', ConsumoRouter)
app.use('/api/Credito', CreditoRouter)
app.use('/api/Emissao', EmissaoRouter)
app.use('/api/FonteEmissao', FonteEmissaoRouter)
app.use('/api/FrotaVeiculo', FrotaVeiculoRouter)
app.use('/api/Transacao', TransacaoCompensacaoRouter)
app.use('/api/projeto', ProjetoEnergeticoRouter)

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