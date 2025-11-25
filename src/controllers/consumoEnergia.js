const { useDebugValue } = require('react')
const ConsumoEnergia = require('../models/consumoEnergia')
const Usuario = require('../models/usuario')

const criarConsumoEnergia = async (req, res) => {
    try {
        const consumoE = new ConsumoEnergia({
            idUsuarioFK: req.body.idUsuarioFK,
            periodo: req.body.periodo,
            kwhConsumidos: req.body.kwhconsumidos,
            fatorConversao: req.body.fatorConversao,
            emissaoGerada: req.body.emissaoGerada
        })
        await consumoE.save()
        res.status(201).json({message: 'Consumo de Energia adicionado com sucesso!', consumoE: consumoE})
    } catch (err){
        console.log('Erro ao adicionar consumo:', err)
        res.status(500).json({error: 'Erro ao adicionar consumo.', details: err.message})
    }
}

const getConsumo = async (req, res) => {
    try {
        console.log('Requisitando consumos de energias...')
        const consumos = await ConsumoEnergia.find()

        console.log('Consumo encontrado:', consumos)
        res.status(201).json(consumos)
    } catch (err) {
        console.error({message: 'Erro ao listar consumos:', err})
        res.status(500).json({error: 'Erro ao listar consumos.', details: err.message
        })
    }
}

const getConsumoId = async (req, res) => {
    const {id} = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({message: `ID não fornecido na URL da requisição.`})
    }
    try {
        const consumo = await ConsumoEnergia.findById(id)
        if(!consumo) {
            return res.status(404).json({message: `Consumo não encontrado com essa id=${id}`})
        }
        res.status(200).json(consumo)
    } catch (err) {
        console.error('Erro ao encontar Consumo de Energia:', err)
        res.status(500).json({error: 'Erro ao encontrar consumo de energia.'})
    }
}

const updateConsumo = async (req, res) => {
    const {id} = req.params

    try {
        const updatedConsumo = await ConsumoEnergia.findByIdAndUpdate(
            {_id:id},
            req.body,
            {new: true}
        )
        if(!updateConsumo) {
            return res.status(400).json({message: `Não foi encontrado nenhum consumo com essa id=${id}.`})
        }
        res.status(200).json({message: 'Consumo de energia atualizado com sucesso!', updatedConsumo})
    } catch (err) {
        console.error('Erro ao atualizar consumo:', err)
        res.status(500).json({error: 'Erro ao atualizar consumo.'})
    }
}

const deleteConsumoById = async (req, res) => {
    const {id} = req.params

    try {
        const deletedConsumo = await ConsumoEnergia.deleteOne({_id: id})
        
        if(deletedConsumo.deletedConsumo === 0) {
            return res.status(404).json({message: `Nenhum consumo encontrado com essa id${id}.`})
        }
        res.status(200).json({message: `Consumo de energia com ID=${id} foi deletado com sucesso!`})
    } catch (err) {
        console.error('Erro ao deletar consumo:', err)
        res.status(500).json({message: 'Erro ao deletar consumo.'})
    }
}

modulo.exports = {
    criarConsumoEnergia,
    getConsumo,
    getConsumoId,
    updateConsumo,
    deleteConsumoById
}