const Emissao = require('../models/emissao')

const criarEmissao = async (req, res) => {
    try {
        const novaEmissao = new Emissao({
            idUsuarioFK: req.body.idUsuarioFK,
            idFonteFk: req.body.idFonteFk,
            dataRegistro: req.body.dataRegistro,
            quantidadeCo2: req.body.quantidadeCo2,
            metodoColeta: req.body.metodoColeta,
            statusBlockchain: req.body.statusBlockchain,
            hashTransacao: req.body.hashTransacao
        })
        await novaEmissao.save()
        res.status(201).json({ message: 'Emissão cadastrada com sucesso!', emissao: novaEmissao })
    } catch (err) {
        console.error('Erro ao cadastrar emissão:', err)
        res.status(500).json({ error: 'Erro ao cadastrar emissão.', details: err.message })
    }
}

const getEmissoes = async (req, res) => {
    try {
        const emissoes = await Emissao.find()
        res.status(200).json(emissoes)
    } catch (err) {
        console.error('Erro ao listar emissões:', err)
        res.status(500).json({ error: 'Erro ao listar emissões.', details: err.message })
    }
}

const getEmissaoId = async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: `ID não fornecido na URL da requisição.` })
    }
    try {
        const emissao = await Emissao.findById(id)
        if (!emissao) {
            return res.status(404).json({ message: `Emissão não encontrada com id=${id}` })
        }
        res.status(200).json(emissao)
    } catch (err) {
        console.error('Erro ao encontrar emissão:', err)
        res.status(500).json({ error: 'Erro ao encontrar emissão.' })
    }
}

const updateEmissao = async (req, res) => {
    const { id } = req.params
    try {
        const updatedEmissao = await Emissao.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedEmissao) {
            return res.status(404).json({ message: `Emissão não encontrada com id=${id}` })
        }
        res.status(200).json({ message: 'Emissão atualizada com sucesso!', updatedEmissao })
    } catch (err) {
        console.error('Erro ao atualizar emissão:', err)
        res.status(500).json({ error: 'Erro ao atualizar emissão.' })
    }
}

const deleteEmissaoById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedEmissao = await Emissao.deleteOne({ _id: id })
        if (deletedEmissao.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhuma emissão encontrada com id=${id}.` })
        }
        res.status(200).json({ message: `Emissão com ID=${id} foi deletada com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar emissão:', err)
        res.status(500).json({ message: 'Erro ao deletar emissão.' })
    }
}

module.exports = {
    criarEmissao,
    getEmissoes,
    getEmissaoId,
    updateEmissao,
    deleteEmissaoById
}
