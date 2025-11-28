const mongoose = require('mongoose')

const consumoEnergiaSchema = new mongoose.Schema({
    idEmissaoFK: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
    },
    periodo: String,
    kwhConsumidos: Number,
    fatorConversao: Number,
    emissaoGerada: Number
})

const ConsumoEnergia = mongoose.model('ConsumoEnergia', consumoEnergiaSchema)
module.exports = ConsumoEnergia