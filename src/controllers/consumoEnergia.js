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