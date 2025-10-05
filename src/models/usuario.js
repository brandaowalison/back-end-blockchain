const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usuarioSchema = new mongoose.Schema({
    tipoUsuario: {
        type: String,
        enum: ['empresa','individuo'],
        required: true
    },
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor, insira um e-mail válido.']
    },
    senha: {
        type: String,
        required: true,
        minlenght: 6
    },
    walletAddress: {
        type: String,
        default: null
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
})

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next()
    
    const salt = await bcrypt.genSalt(10)
    this.senha = await bcrypt.hash(this.senha, salt)
    next()
})

usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha)
}

module.exports = mongoose.model('Usuario', usuarioSchema)