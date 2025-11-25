const CreditoCarbono = require('../models/creditoCarbono')

const criarCreditoCarbono = async (req, res) => {
    try {
        const credito = new CreditoCarbono({
            codigoToken: req.body.codigoToken,
            valorTonCo2: req.body.valorTonCo2,
            dataEmissao: req.body.dataEmissao,
            status: req.body.status,
            idUsuarioFK: req.body.idUsuarioFK
        })
        await credito.save()
        res.status(201).json({ message: 'Crédito de carbono criado com sucesso!', credito })
    } catch (err) {
        console.error('Erro ao criar crédito de carbono:', err)
        res.status(500).json({ error: 'Erro ao criar crédito de carbono.', details: err.message })
    }
}


const getCreditos = async (req, res) => {
    try {
        const creditos = await CreditoCarbono.find()
        res.status(200).json(creditos)
    } catch (err) {
        console.error('Erro ao listar créditos de carbono:', err)
        res.status(500).json({ error: 'Erro ao listar créditos de carbono.', details: err.message })
    }
}

const getCreditoId = async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: `ID não fornecido na URL da requisição.` })
    }
    try {
        const credito = await CreditoCarbono.findById(id)
        if (!credito) {
            return res.status(404).json({ message: `Crédito de carbono não encontrado com id=${id}` })
        }
        res.status(200).json(credito)
    } catch (err) {
        console.error('Erro ao encontrar crédito de carbono:', err)
        res.status(500).json({ error: 'Erro ao encontrar crédito de carbono.' })
    }
}


const updateCredito = async (req, res) => {
    const { id } = req.params
    try {
        const updatedCredito = await CreditoCarbono.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedCredito) {
            return res.status(404).json({ message: `Crédito de carbono não encontrado com id=${id}` })
        }
        res.status(200).json({ message: 'Crédito de carbono atualizado com sucesso!', updatedCredito })
    } catch (err) {
        console.error('Erro ao atualizar crédito de carbono:', err)
        res.status(500).json({ error: 'Erro ao atualizar crédito de carbono.' })
    }
}

const deleteCreditoById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedCredito = await CreditoCarbono.deleteOne({ _id: id })
        if (deletedCredito.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhum crédito de carbono encontrado com id=${id}.` })
        }
        res.status(200).json({ message: `Crédito de carbono com ID=${id} foi deletado com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar crédito de carbono:', err)
        res.status(500).json({ message: 'Erro ao deletar crédito de carbono.' })
    }
}

module.exports = {
    criarCreditoCarbono,
    getCreditos,
    getCreditoId,
    updateCredito,
    deleteCreditoById
}
