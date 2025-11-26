const express = require('express')
const creditoController = require('../controllers/creditoCarbono')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: CreditoCarbono
 *     description: API para gerenciamento de créditos de carbono
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreditoCarbono:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do crédito de carbono
 *         codigoToken:
 *           type: string
 *           description: Código único do token
 *         valorTonCo2:
 *           type: number
 *           description: Valor do crédito em toneladas de CO2
 *         dataEmissao:
 *           type: string
 *           format: date-time
 *           description: Data de emissão do crédito
 *         status:
 *           type: string
 *           enum: [ativo, usado, expirado]
 *           description: Status do crédito
 *         idUsuarioFK:
 *           type: string
 *           description: ID do usuário relacionado
 */

/**
 * @swagger
 * /api/creditoCarbono:
 *   post:
 *     summary: Cadastra um novo crédito de carbono
 *     tags: [CreditoCarbono]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreditoCarbono'
 *     responses:
 *       201:
 *         description: Crédito cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 credito:
 *                   $ref: '#/components/schemas/CreditoCarbono'
 *       500:
 *         description: Erro ao cadastrar crédito
 */
router.post('/', authenticate, creditoController.criarCreditoCarbono)

/**
 * @swagger
 * /api/creditoCarbono:
 *   get:
 *     summary: Lista todos os créditos de carbono
 *     tags: [CreditoCarbono]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreditoCarbono'
 *       500:
 *         description: Erro ao listar créditos
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), creditoController.getCreditos)

/**
 * @swagger
 * /api/creditoCarbono/{id}:
 *   get:
 *     summary: Consulta crédito de carbono por ID
 *     tags: [CreditoCarbono]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Crédito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreditoCarbono'
 *       404:
 *         description: Crédito não encontrado
 *       500:
 *         description: Erro ao buscar crédito
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), creditoController.getCreditoId)

/**
 * @swagger
 * /api/creditoCarbono/{id}:
 *   put:
 *     summary: Atualiza crédito de carbono
 *     tags: [CreditoCarbono]
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
 *             $ref: '#/components/schemas/CreditoCarbono'
 *     responses:
 *       200:
 *         description: Crédito atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedCredito:
 *                   $ref: '#/components/schemas/CreditoCarbono'
 *       404:
 *         description: Crédito não encontrado
 *       500:
 *         description: Erro ao atualizar crédito
 */
router.put('/:id', authenticate, authorize(['individuo','empresa','admin']), creditoController.updateCredito)

/**
 * @swagger
 * /api/creditoCarbono/{id}:
 *   delete:
 *     summary: Deleta crédito de carbono por ID
 *     tags: [CreditoCarbono]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Crédito deletado com sucesso
 *       404:
 *         description: Crédito não encontrado
 *       500:
 *         description: Erro ao deletar crédito
 */
router.delete('/:id', authenticate, authorize(['individuo','empresa','admin']), creditoController.deleteCreditoById)

module.exports = router
