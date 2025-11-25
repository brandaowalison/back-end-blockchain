const express = require('express')
const consumoController = require('../controllers/consumoEnergia')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: ConsumoEnergia
 *     description: API para gerenciamento e consulta de consumo de energia dos usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConsumoEnergia:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: "ID do registro de consumo"
 *         idUsuarioFK:
 *           type: string
 *           description: "ID do usuário relacionado"
 *         periodo:
 *           type: string
 *           description: "Período do consumo (ex: 2025-11)"
 *         kwhConsumidos:
 *           type: number
 *           description: "Total de kWh consumidos"
 *         fatorConversao:
 *           type: number
 *           description: "Fator de conversão aplicado"
 *         emissaoGerada:
 *           type: number
 *           description: "Emissão gerada relacionada ao consumo"
 */

/**
 * @swagger
 * /api/consumoEnergia:
 *   post:
 *     summary: Registra um novo consumo de energia
 *     tags: [ConsumoEnergia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsumoEnergia'
 *     responses:
 *       201:
 *         description: Consumo de energia cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 consumoE:
 *                   $ref: '#/components/schemas/ConsumoEnergia'
 *       500:
 *         description: Erro ao cadastrar consumo
 */
router.post('/', authenticate, consumoController.criarConsumoEnergia)

/**
 * @swagger
 * /api/consumoEnergia:
 *   get:
 *     summary: Lista todos os registros de consumo de energia
 *     tags: [ConsumoEnergia]
 *     responses:
 *       200:
 *         description: Consumos retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ConsumoEnergia'
 *       500:
 *         description: Erro ao listar consumos
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), consumoController.getConsumo)

/**
 * @swagger
 * /api/consumoEnergia/{id}:
 *   get:
 *     summary: Consulta um registro de consumo de energia por ID
 *     tags: [ConsumoEnergia]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consumo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsumoEnergia'
 *       404:
 *         description: Consumo não encontrado
 *       500:
 *         description: Erro ao buscar consumo
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), consumoController.getConsumoId)

/**
 * @swagger
 * /api/consumoEnergia/{id}:
 *   put:
 *     summary: Atualiza um registro de consumo de energia
 *     tags: [ConsumoEnergia]
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
 *             $ref: '#/components/schemas/ConsumoEnergia'
 *     responses:
 *       200:
 *         description: Consumo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedConsumo:
 *                   $ref: '#/components/schemas/ConsumoEnergia'
 *       400:
 *         description: ID inválido ou dados incorretos
 *       500:
 *         description: Erro ao atualizar consumo
 */
router.put('/:id', authenticate, authorize('admin'), consumoController.updateConsumo)

/**
 * @swagger
 * /api/consumoEnergia/{id}:
 *   delete:
 *     summary: Deleta um consumo de energia por ID
 *     tags: [ConsumoEnergia]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consumo deletado com sucesso
 *       404:
 *         description: Consumo não encontrado
 *       500:
 *         description: Erro ao deletar consumo
 */
router.delete('/:id', authenticate, authorize('admin'), consumoController.deleteConsumoById)

module.exports = router
