const express = require('express')
const fonteEmissaoController = require('../controllers/fonteEmissao')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: FonteEmissao
 *     description: API para gerenciamento de fontes de emissão de CO2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FonteEmissao:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da fonte de emissão
 *         tipoFonte:
 *           type: string
 *           description: "Tipo da fonte (Ex: veículo, indústria, etc.)"
 *         descricao:
 *           type: string
 *           description: Descrição opcional da fonte
 */

/**
 * @swagger
 * /api/fonteEmissao:
 *   post:
 *     summary: Cadastra uma nova fonte de emissão
 *     tags: [FonteEmissao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FonteEmissao'
 *     responses:
 *       201:
 *         description: Fonte cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 fonte:
 *                   $ref: '#/components/schemas/FonteEmissao'
 *       500:
 *         description: Erro ao cadastrar fonte
 */
router.post('/', authenticate, authorize(['individuo','empresa','admin']), fonteEmissaoController.criarFonteEmissao)

/**
 * @swagger
 * /api/fonteEmissao:
 *   get:
 *     summary: Lista todas as fontes de emissão
 *     tags: [FonteEmissao]
 *     responses:
 *       200:
 *         description: Lista de fontes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FonteEmissao'
 *       500:
 *         description: Erro ao listar fontes
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), fonteEmissaoController.getFontesEmissao)

/**
 * @swagger
 * /api/fonteEmissao/{id}:
 *   get:
 *     summary: Consulta uma fonte de emissão por ID
 *     tags: [FonteEmissao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fonte encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FonteEmissao'
 *       404:
 *         description: Fonte não encontrada
 *       500:
 *         description: Erro ao buscar fonte
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), fonteEmissaoController.getFonteEmissaoId)

/**
 * @swagger
 * /api/fonteEmissao/{id}:
 *   put:
 *     summary: Atualiza uma fonte de emissão
 *     tags: [FonteEmissao]
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
 *             $ref: '#/components/schemas/FonteEmissao'
 *     responses:
 *       200:
 *         description: Fonte de emissão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedFonte:
 *                   $ref: '#/components/schemas/FonteEmissao'
 *       404:
 *         description: Fonte não encontrada
 *       500:
 *         description: Erro ao atualizar fonte
 */
router.put('/:id', authenticate, authorize(['individuo','empresa','admin']), fonteEmissaoController.updateFonteEmissao)

/**
 * @swagger
 * /api/fonteEmissao/{id}:
 *   delete:
 *     summary: Deleta uma fonte de emissão por ID
 *     tags: [FonteEmissao]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fonte deletada com sucesso
 *       404:
 *         description: Fonte não encontrada
 *       500:
 *         description: Erro ao deletar fonte
 */
router.delete('/:id', authenticate, authorize(['individuo','empresa','admin']), fonteEmissaoController.deleteFonteEmissaoById)

module.exports = router
