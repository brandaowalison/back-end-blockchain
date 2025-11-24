const mongoose = require('mongoose')

const creditoCarbonoSchema = new mongoose.Schema({
    codigoToken: { 
        type: String, 
        required: true, 
        unique: true 
    },
    valorTonCo2: { 
        type: Number,
        required: true 
    },
    dataEmissao: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['ativo', 'usado', 'expirado'], 
        default: 'ativo' 
    },
    idUsuarioFK: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    }
})

const CreditoCarbono = mongoose.model('CreditoCarbono', creditoCarbonoSchema)
module.exports = CreditoCarbono