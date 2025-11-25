const mongoose = require('mongoose')

const emissaoSchema = new mongoose.Schema({
    idUsuarioFK: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', required: true
    },
    idFonteFk: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FonteEmissao', required: true
    },
    dataRegistro: { 
        type: Date,
        default: Date.now
    },
    quantidadeCo2: {
        type: Number,
        required: true,
    },
    metodoColeta: {
        type: String,
        enum: ['manual','API','Iot'],
        required: true
    },
    statusBlockchain: {
        type: String,
        enum: ['pendente','registrado'],
        default: 'pendente'
    },
    hashTransacao: String
})

const Emissao = mongoose.model('Emissao', emissaoSchema)
module.exports = Emissao