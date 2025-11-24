const mongoose = require('mongoose')

const frotaVeiculoSchema = new mongoose.Schema({
    idUsuarioFK: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    tipoCombustivel: String,
    consumoLitros: Number,
    fatorConversao: Number,
    emissaoGerada: Number
})

const FrotaVeiculo = mongoose.model('FrotaVeiculo', frotaVeiculoSchema)
module.exports = FrotaVeiculo