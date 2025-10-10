const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const usuarioSchema = new mongoose.Schema({
    perfil: {
        type: String,
        enum: ['empresa','individuo', 'admin'],
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
        minlength: 6
    },
    walletAddress: {
        type: String,
        default: null
    }
}, {timestamps: true})

usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next()
    
    const salt = await bcrypt.genSalt(10)
    this.senha = await bcrypt.hash(this.senha, salt)
    next()
})

usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha)
}

usuarioSchema.methods.gerarTokenJWT = function(){
    const jwt = require('jsonwebtoken')
    return jwt.sign(
        {id: this._id, perfil: this.perfil},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
    )
}

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario