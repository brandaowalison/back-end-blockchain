const mongoose = require('mongoose')

const fonteEmissaoSchema = new mongoose.Schema({
    tipoFonte: { type: String, 
    required: true 
    },
    descricao: String
})

const FonteEmissao = mongoose.model('FonteEmissao', fonteEmissaoSchema)
module.exports = FonteEmissao