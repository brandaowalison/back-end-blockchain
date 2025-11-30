const mongoose = require('mongoose')

const projetoSchema = new mongoose.Schema({
    nome: String,
    tipo: {
        type: String,
        enum: ['solar','eolica','reflorestamento','eficiencia'],
    },
    descricao: String,
    saldoToken: Number,
    preco: Number,
    reducao: Number,
    local: String,
    status: {
        type: String,
        enum: ['verificado','pendente']
    }
})

const Projeto = mongoose.model('Projeto', projetoSchema)
module.exports = Projeto