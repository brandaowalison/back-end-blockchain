const express = require('express')
const emissaoController = require('../controllers/emissao')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Emissao
 *     description: API para gerenciamento de emissões de CO2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Emissao:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da emissão
 *         idUsuarioFK:
 *           type: string
 *           description: ID do usuário relacionado
 *         idFonteFk:
 *           type: string
 *           description: ID da fonte de emissão relacionada
 *         dataRegistro:
 *           type: string
 *           format: date-time
 *           description: Data do registro da emissão
 *         quantidadeCo2:
 *           type: number
 *           description: Quantidade de CO2 emitida
 *         metodoColeta:
 *           type: string
 *           enum: [manual, API, Iot]
 *           description: Método de coleta dos dados de emissão
 *         statusBlockchain:
 *           type: string
 *           enum: [pendente, registrado]
 *           description: Status do registro na blockchain
 *         hashTransacao:
 *           type: string
 *           description: Hash da transação na blockchain, se disponível
 */

/**
 * @swagger
 * /api/emissao:
 *   post:
 *     summary: Cadastra um novo registro de emissão
 *     tags: [Emissao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emissao'
 *     responses:
 *       201:
 *         description: Emissão cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 emissao:
 *                   $ref: '#/components/schemas/Emissao'
 *       500:
 *         description: Erro ao cadastrar emissão
 */
router.post('/', authenticate, emissaoController.criarEmissao)

/**
 * @swagger
 * /api/emissao:
 *   get:
 *     summary: Lista todas as emissões cadastradas
 *     tags: [Emissao]
 *     responses:
 *       200:
 *         description: Lista de emissões retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emissao'
 *       500:
 *         description: Erro ao listar emissões
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), emissaoController.getEmissoes)

/**
 * @swagger
 * /api/emissao/{id}:
 *   get:
 *     summary: Consulta uma emissão por ID
 *     tags: [Emissao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Emissão encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emissao'
 *       404:
 *         description: Emissão não encontrada
 *       500:
 *         description: Erro ao buscar emissão
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), emissaoController.getEmissaoId)

/**
 * @swagger
 * /api/emissao/{id}:
 *   put:
 *     summary: Atualiza um registro de emissão
 *     tags: [Emissao]
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
 *             $ref: '#/components/schemas/Emissao'
 *     responses:
 *       200:
 *         description: Emissão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedEmissao:
 *                   $ref: '#/components/schemas/Emissao'
 *       404:
 *         description: Emissão não encontrada
 *       500:
 *         description: Erro ao atualizar emissão
 */
router.put('/:id', authenticate, authorize('admin'), emissaoController.updateEmissao)

/**
 * @swagger
 * /api/emissao/{id}:
 *   delete:
 *     summary: Deleta uma emissão por ID
 *     tags: [Emissao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Emissão deletada com sucesso
 *       404:
 *         description: Emissão não encontrada
 *       500:
 *         description: Erro ao deletar emissão
 */
router.delete('/:id', authenticate, authorize('admin'), emissaoController.deleteEmissaoById)

module.exports = router
