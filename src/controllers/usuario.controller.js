const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const criarUsuario = async (req, res) => {
    try {
        const usuario = new Usuario({
            perfil: req.body.perfil,
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            walletAddress: req.body.walletAddress,
            criadoEm: req.body.criadoEm
        })
        await usuario.save()
        res.status(201).json({message: 'Usuário cadastrado com sucesso!', usuario: usuario})
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err)
        res.status(500).json({error: 'Erro ao cadastrar usuário.', details: err.message})
    }
}

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-senha')
        res.status(200).json(usuarios)
    } catch (err) {
        console.error('Erro ao listar usuários:', err)
        res.status(500).json({error: 'Erro ao listar usuários.'})
    }
}

const getUsuarioId = async (req, res) => {
    const {id} = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({message: `ID não fornecido na URL da requisição.`})
    }
    try {
        const usuario = await Usuario.findById(id).select('-senha')
        if(!usuario) {
            return res.status(404).json({message: `Usuário não encontrado com essa id=${id}`})
        }
        res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao encontar usuário:', err)
        res.status(500).json({error: 'Erro ao encontrar usuário.'})
    }
}

const login = async (req, res) => {
    const {email, senha} = req.body
    try {
        const usuario = await Usuario.findOne({email})
        if(!usuario)
            return res.status(400).json({message: 'Usuário não encontrado'})
        const isMatch = await bcrypt.compare(senha, usuario.senha)
        if(!isMatch)
            return res.status(400).json({message: 'Senha incorreta'})
        const token = usuario.gerarTokenJWT()
        res.status(200).json({
            message: 'Login bem-sucedido',
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            },
            token
        })
    } catch (err) {
        console.error('Erro ao realizar login', err)
        res.status(500).json({error: 'Error ao realizar login'})
    }
}

const updateUsuario = async (req, res) => {
    const {id} = req.params
    if(req.body.senha && req.body.senha.trim() !=='') {
        req.body.senha = await bcrypt.hash(req.body.senha, 10)
    } else {
        delete req.body.senha
    }
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            {_id: id},
            req.body,
            {new: true}
        )
        if(!usuario) {
            return res.status(404).json({message: `Usuário não encontrado com essa id=${id}`})
        }
        const usuarioResponse = usuario.toObject()
        delete usuarioResponse.senha
        res.status(200).json({message: 'Usuário atualizado com sucesso!', usuario: usuarioResponse})
    } catch (err) {
        console.error('Erro aos atualizar usuário.')
        res.status(500).json({error: 'Erro ao atualizar usuário.'})
    }
}

const deleteUsuarioId = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID inválido'})
    }
    
    try {
        const usuario = await User.deleteOne({_id: id})
        if(usuario.deletedCount === 0) {
          return  res.status(404).json({message: `Nenhum usuário encontrado com essa id=${id}.`})
        }
        res.status(200).json({message: `Usuário com ID=${id} foi deletado com sucesso!`})
    } catch (err) {
        console.error('Erro ao deletar usuário:', err)
        res.status(500).json({error: 'Erro ao deletar usuário.'})
    }
}

module.exports = {
    criarUsuario,
    getUsuarios,
    getUsuarioId,
    login,
    updateUsuario,
    deleteUsuarioId
}