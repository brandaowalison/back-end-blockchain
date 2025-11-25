const express = require('express')
const transacaoCompensacaoController = require('../controllers/transacaoCompensacao.controller')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: TransacaoCompensacao
 *     description: API para gerenciamento de transações de compensação de créditos de carbono
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransacaoCompensacao:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da transação
 *         idCreditoFK:
 *           type: string
 *           description: ID do crédito de carbono associado
 *         idUsuarioFK:
 *           type: string
 *           description: ID do usuário associado à transação
 *         idEmissaoFK:
 *           type: string
 *           description: ID da emissão compensada
 *         quantidadeutilizada:
 *           type: number
 *           description: Quantidade utilizada para compensação
 *         datacompensacao:
 *           type: string
 *           format: date-time
 *           description: Data da compensação
 *         tipotransacao:
 *           type: string
 *           enum: [compra, venda, compensacao]
 *           description: Tipo da transação
 *         hashblockchain:
 *           type: string
 *           description: Hash da transação na blockchain
 */

/**
 * @swagger
 * /api/transacaoCompensacao:
 *   post:
 *     summary: Cadastra uma nova transação de compensação
 *     tags: [TransacaoCompensacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransacaoCompensacao'
 *     responses:
 *       201:
 *         description: Transação cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transacao:
 *                   $ref: '#/components/schemas/TransacaoCompensacao'
 *       500:
 *         description: Erro ao cadastrar transação
 */
router.post('/', authenticate, authorize(['admin','empresa']), transacaoCompensacaoController.criarTransacaoCompensacao)

/**
 * @swagger
 * /api/transacaoCompensacao:
 *   get:
 *     summary: Lista todas as transações de compensação
 *     tags: [TransacaoCompensacao]
 *     responses:
 *       200:
 *         description: Lista de transações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransacaoCompensacao'
 *       500:
 *         description: Erro ao listar transações
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), transacaoCompensacaoController.getTransacoesCompensacao)

/**
 * @swagger
 * /api/transacaoCompensacao/{id}:
 *   get:
 *     summary: Consulta uma transação de compensação por ID
 *     tags: [TransacaoCompensacao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransacaoCompensacao'
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro ao buscar transação
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), transacaoCompensacaoController.getTransacaoCompensacaoId)

/**
 * @swagger
 * /api/transacaoCompensacao/{id}:
 *   put:
 *     summary: Atualiza uma transação de compensação
 *     tags: [TransacaoCompensacao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransacaoCompensacao'
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedTransacao:
 *                   $ref: '#/components/schemas/TransacaoCompensacao'
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro ao atualizar transação
 */
router.put('/:id', authenticate, authorize(['admin','empresa']), transacaoCompensacaoController.updateTransacaoCompensacao)

/**
 * @swagger
 * /api/transacaoCompensacao/{id}:
 *   delete:
 *     summary: Deleta uma transação de compensação por ID
 *     tags: [TransacaoCompensacao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transação deletada com sucesso
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro ao deletar transação
 */
router.delete('/:id', authenticate, authorize(['admin','empresa']), transacaoCompensacaoController.deleteTransacaoCompensacaoById)

module.exports = router
