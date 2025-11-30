const Projeto = require('../models/projetoEnergetico')

const criarProjeto = async (req, res) => {
  try {
    const projeto = new Projeto({
      nome: req.body.nome,
      tipo: req.body.tipo,
      descricao: req.body.descricao,
      saldoToken: req.body.saldoToken,
      preco: req.body.preco,
      reducao: req.body.reducao,
      local: req.body.local,
      status: req.body.status
    })

    await projeto.save()
    res.status(201).json({ message: 'Projeto criado com sucesso!', projeto })
  } catch (err) {
    console.error('Erro ao criar projeto:', err)
    res.status(500).json({ error: 'Erro ao criar projeto.', details: err.message })
  }
}

const getProjetos = async (req, res) => {
  try {
    const projetos = await Projeto.find()
    res.status(200).json(projetos)
  } catch (err) {
    console.error('Erro ao listar projetos:', err)
    res.status(500).json({ error: 'Erro ao listar projetos.', details: err.message })
  }
}

const getProjetoId = async (req, res) => {
  const { id } = req.params
  if (!id || id.trim() === '') {
    return res.status(400).json({ message: 'ID não fornecido na URL da requisição.' })
  }

  try {
    const projeto = await Projeto.findById(id)
    if (!projeto) {
      return res.status(404).json({ message: `Projeto não encontrado com id=${id}` })
    }
    res.status(200).json(projeto)
  } catch (err) {
    console.error('Erro ao encontrar projeto:', err)
    res.status(500).json({ error: 'Erro ao encontrar projeto.' })
  }
}

const updateProjeto = async (req, res) => {
  const { id } = req.params

  try {
    const updatedProjeto = await Projeto.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    )

    if (!updatedProjeto) {
      return res.status(404).json({ message: `Projeto não encontrado com id=${id}` })
    }

    res.status(200).json({ message: 'Projeto atualizado com sucesso!', updatedProjeto })
  } catch (err) {
    console.error('Erro ao atualizar projeto:', err)
    res.status(500).json({ error: 'Erro ao atualizar projeto.' })
  }
}

const deleteProjetoById = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProjeto = await Projeto.deleteOne({ _id: id })

    if (deletedProjeto.deletedCount === 0) {
      return res.status(404).json({ message: `Nenhum projeto encontrado com id=${id}.` })
    }

    res.status(200).json({ message: `Projeto com ID=${id} foi deletado com sucesso!` })
  } catch (err) {
    console.error('Erro ao deletar projeto:', err)
    res.status(500).json({ error: 'Erro ao deletar projeto.' })
  }
}

module.exports = {
  criarProjeto,
  getProjetos,
  getProjetoId,
  updateProjeto,
  deleteProjetoById
}
