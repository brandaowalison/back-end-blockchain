const mongoose = require('mongoose')

const transacaoCompensacaoSchema = new mongoose.Schema({
    idProjetoFK: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CreditoCarbono', 
        required: true 
    },
    idUsuarioFK: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    idEmissaoFK: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Emissao', 
        required: true 
    },
    quantidadeutilizada: { 
        type: Number, 
        required: true 
    },
    datacompensacao: { 
        type: Date, 
        default: Date.now 
    },
    tipotransacao: { 
        type: String, 
        enum: ['compra', 'venda', 'compensacao'], 
        required: true 
    },
    hashblockchain: String
})

const TransacaoCompensacao = mongoose.model('TransacaoCompensacao', transacaoCompensacaoSchema)
module.exports = TransacaoCompensacao 