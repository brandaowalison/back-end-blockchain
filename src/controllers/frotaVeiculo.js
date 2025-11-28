const FrotaVeiculo = require('../models/frotaVeiculo')

const criarFrotaVeiculo = async (req, res) => {
    try {
        const veiculo = new FrotaVeiculo({
            idEmissaoFK: req.body.idUsuarioFK,
            tipoCombustivel: req.body.tipoCombustivel,
            consumoLitros: req.body.consumoLitros,
            fatorConversao: req.body.fatorConversao,
            emissaoGerada: req.body.emissaoGerada
        })
        await veiculo.save()
        res.status(201).json({ message: 'Veículo da frota cadastrado com sucesso!', veiculo })
    } catch (err) {
        console.error('Erro ao cadastrar veículo da frota:', err)
        res.status(500).json({ error: 'Erro ao cadastrar veículo da frota.', details: err.message })
    }
}

const getFrotaVeiculos = async (req, res) => {
    try {
        const veiculos = await FrotaVeiculo.find()
        res.status(200).json(veiculos)
    } catch (err) {
        console.error('Erro ao listar veículos da frota:', err)
        res.status(500).json({ error: 'Erro ao listar veículos da frota.', details: err.message })
    }
}

const getFrotaVeiculoId = async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: 'ID não fornecido na URL da requisição.' })
    }
    try {
        const veiculo = await FrotaVeiculo.findById(id)
        if (!veiculo) {
            return res.status(404).json({ message: `Veículo da frota não encontrado com id=${id}` })
        }
        res.status(200).json(veiculo)
    } catch (err) {
        console.error('Erro ao encontrar veículo da frota:', err)
        res.status(500).json({ error: 'Erro ao encontrar veículo da frota.' })
    }
}

const updateFrotaVeiculo = async (req, res) => {
    const { id } = req.params
    try {
        const updatedVeiculo = await FrotaVeiculo.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedVeiculo) {
            return res.status(404).json({ message: `Veículo da frota não encontrado com id=${id}` })
        }
        res.status(200).json({ message: 'Veículo da frota atualizado com sucesso!', updatedVeiculo })
    } catch (err) {
        console.error('Erro ao atualizar veículo da frota:', err)
        res.status(500).json({ error: 'Erro ao atualizar veículo da frota.' })
    }
}

const deleteFrotaVeiculoById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedVeiculo = await FrotaVeiculo.deleteOne({ _id: id })
        if (deletedVeiculo.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhum veículo da frota encontrado com id=${id}.` })
        }
        res.status(200).json({ message: `Veículo da frota com ID=${id} foi deletado com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar veículo da frota:', err)
        res.status(500).json({ error: 'Erro ao deletar veículo da frota.' })
    }
}

module.exports = {
    criarFrotaVeiculo,
    getFrotaVeiculos,
    getFrotaVeiculoId,
    updateFrotaVeiculo,
    deleteFrotaVeiculoById
}
