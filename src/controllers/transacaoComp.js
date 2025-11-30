const TransacaoCompensacao = require('../models/transacaoCompensacao')

const criarTransacaoCompensacao = async (req, res) => {
    try {
        const transacao = new TransacaoCompensacao({
            idProjetoFK: req.body.idProjetoFK,
            idUsuarioFK: req.body.idUsuarioFK,
            idEmissaoFK: req.body.idEmissaoFK,
            quantidadeutilizada: req.body.quantidadeutilizada,
            datacompensacao: req.body.datacompensacao,
            tipotransacao: req.body.tipotransacao,
            hashblockchain: req.body.hashblockchain
        })
        await transacao.save()
        res.status(201).json({ message: 'Transação de compensação registrada com sucesso!', transacao })
    } catch (err) {
        console.error('Erro ao cadastrar transação de compensação:', err)
        res.status(500).json({ error: 'Erro ao cadastrar transação de compensação.', details: err.message })
    }
}

const getTransacoesCompensacao = async (req, res) => {
    try {
        const transacoes = await TransacaoCompensacao.find()
        res.status(200).json(transacoes)
    } catch (err) {
        console.error('Erro ao listar transações de compensação:', err)
        res.status(500).json({ error: 'Erro ao listar transações de compensação.', details: err.message })
    }
}

const getTransacaoCompensacaoId = async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: 'ID não fornecido na URL da requisição.' })
    }
    try {
        const transacao = await TransacaoCompensacao.findById(id)
        if (!transacao) {
            return res.status(404).json({ message: `Transação de compensação não encontrada com id=${id}` })
        }
        res.status(200).json(transacao)
    } catch (err) {
        console.error('Erro ao encontrar transação de compensação:', err)
        res.status(500).json({ error: 'Erro ao encontrar transação de compensação.' })
    }
}

const updateTransacaoCompensacao = async (req, res) => {
    const { id } = req.params
    try {
        const updatedTransacao = await TransacaoCompensacao.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedTransacao) {
            return res.status(404).json({ message: `Transação de compensação não encontrada com id=${id}` })
        }
        res.status(200).json({ message: 'Transação de compensação atualizada com sucesso!', updatedTransacao })
    } catch (err) {
        console.error('Erro ao atualizar transação de compensação:', err)
        res.status(500).json({ error: 'Erro ao atualizar transação de compensação.' })
    }
}

const deleteTransacaoCompensacaoById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedTransacao = await TransacaoCompensacao.deleteOne({ _id: id })
        if (deletedTransacao.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhuma transação de compensação encontrada com id=${id}.` })
        }
        res.status(200).json({ message: `Transação de compensação com ID=${id} foi deletada com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar transação de compensação:', err)
        res.status(500).json({ error: 'Erro ao deletar transação de compensação.' })
    }
}

module.exports = {
    criarTransacaoCompensacao,
    getTransacoesCompensacao,
    getTransacaoCompensacaoId,
    updateTransacaoCompensacao,
    deleteTransacaoCompensacaoById
}
