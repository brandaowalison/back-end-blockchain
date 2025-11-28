const mongoose = require('mongoose')

const projetoSchema = new mongoose.Schema({
    nome: String,
    tipo: {
        type: String,
        enum: ['solar','eolica','reflorestamento','eficiencia'],
    },
    descricao: String,
    saldoToken: Number
})

const Projeto = mongoose.model('Projeto', projetoSchema)
module.exports = Projeto