const express = require('express')
const frotaVeiculoController = require('../controllers/frotaVeiculo')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: FrotaVeiculo
 *     description: API para gerenciamento da frota de veículos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FrotaVeiculo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do veículo na frota
 *         idUsuarioFK:
 *           type: string
 *           description: ID do usuário responsável pelo veículo
 *         tipoCombustivel:
 *           type: string
 *           description: Tipo de combustível utilizado
 *         consumoLitros:
 *           type: number
 *           description: Consumo em litros
 *         fatorConversao:
 *           type: number
 *           description: Fator de conversão para emissão
 *         emissaoGerada:
 *           type: number
 *           description: Quantidade de emissão gerada em CO2
 */

/**
 * @swagger
 * /api/frotaVeiculo:
 *   post:
 *     summary: Cadastra um novo veículo na frota
 *     tags: [FrotaVeiculo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FrotaVeiculo'
 *     responses:
 *       201:
 *         description: Veículo cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 veiculo:
 *                   $ref: '#/components/schemas/FrotaVeiculo'
 *       500:
 *         description: Erro ao cadastrar veículo
 */
router.post('/', authenticate, authorize(['individuo','empresa','admin']), frotaVeiculoController.criarFrotaVeiculo)

/**
 * @swagger
 * /api/frotaVeiculo:
 *   get:
 *     summary: Lista os veículos da frota
 *     tags: [FrotaVeiculo]
 *     responses:
 *       200:
 *         description: Lista de veículos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FrotaVeiculo'
 *       500:
 *         description: Erro ao listar veículos
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), frotaVeiculoController.getFrotaVeiculos)

/**
 * @swagger
 * /api/frotaVeiculo/{id}:
 *   get:
 *     summary: Consulta um veículo da frota por ID
 *     tags: [FrotaVeiculo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FrotaVeiculo'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro ao buscar veículo
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), frotaVeiculoController.getFrotaVeiculoId)

/**
 * @swagger
 * /api/frotaVeiculo/{id}:
 *   put:
 *     summary: Atualiza um veículo da frota
 *     tags: [FrotaVeiculo]
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
 *             $ref: '#/components/schemas/FrotaVeiculo'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedVeiculo:
 *                   $ref: '#/components/schemas/FrotaVeiculo'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro ao atualizar veículo
 */
router.put('/:id', authenticate, authorize(['individuo','empresa','admin']), frotaVeiculoController.updateFrotaVeiculo)

/**
 * @swagger
 * /api/frotaVeiculo/{id}:
 *   delete:
 *     summary: Deleta um veículo da frota por ID
 *     tags: [FrotaVeiculo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Veículo deletado com sucesso
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro ao deletar veículo
 */
router.delete('/:id', authenticate, authorize(['individuo','empresa','admin']), frotaVeiculoController.deleteFrotaVeiculoById)

module.exports = router
