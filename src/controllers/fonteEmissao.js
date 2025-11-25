const FonteEmissao = require('../models/fonteEmissao')

const criarFonteEmissao = async (req, res) => {
    try {
        const fonte = new FonteEmissao({
            tipoFonte: req.body.tipoFonte,
            descricao: req.body.descricao
        })
        await fonte.save()
        res.status(201).json({ message: 'Fonte de emissão cadastrada com sucesso!', fonte })
    } catch (err) {
        console.error('Erro ao cadastrar fonte de emissão:', err)
        res.status(500).json({ error: 'Erro ao cadastrar fonte de emissão.', details: err.message })
    }
}

const getFontesEmissao = async (req, res) => {
    try {
        const fontes = await FonteEmissao.find()
        res.status(200).json(fontes)
    } catch (err) {
        console.error('Erro ao listar fontes de emissão:', err)
        res.status(500).json({ error: 'Erro ao listar fontes de emissão.', details: err.message })
    }
}

const getFonteEmissaoId = async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: 'ID não fornecido na URL da requisição.' })
    }
    try {
        const fonte = await FonteEmissao.findById(id)
        if (!fonte) {
            return res.status(404).json({ message: `Fonte de emissão não encontrada com id=${id}` })
        }
        res.status(200).json(fonte)
    } catch (err) {
        console.error('Erro ao encontrar fonte de emissão:', err)
        res.status(500).json({ error: 'Erro ao encontrar fonte de emissão.' })
    }
}

const updateFonteEmissao = async (req, res) => {
    const { id } = req.params
    try {
        const updatedFonte = await FonteEmissao.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedFonte) {
            return res.status(404).json({ message: `Fonte de emissão não encontrada com id=${id}` })
        }
        res.status(200).json({ message: 'Fonte de emissão atualizada com sucesso!', updatedFonte })
    } catch (err) {
        console.error('Erro ao atualizar fonte de emissão:', err)
        res.status(500).json({ error: 'Erro ao atualizar fonte de emissão.' })
    }
}

const deleteFonteEmissaoById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedFonte = await FonteEmissao.deleteOne({ _id: id })
        if (deletedFonte.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhuma fonte de emissão encontrada com id=${id}.` })
        }
        res.status(200).json({ message: `Fonte de emissão com ID=${id} foi deletada com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar fonte de emissão:', err)
        res.status(500).json({ error: 'Erro ao deletar fonte de emissão.' })
    }
}

module.exports = {
    criarFonteEmissao,
    getFontesEmissao,
    getFonteEmissaoId,
    updateFonteEmissao,
    deleteFonteEmissaoById
}
