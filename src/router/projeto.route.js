const express = require('express')
const projetoController = require('../controllers/projeto')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Projeto
 *     description: API para gerenciamento de projeto energeticos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Projeto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do projeto
 *         nome:
 *           type: string
 *           description: Nome do projeto
 *         tipo:
 *           type: string
 *           enum: [solar, eolica, reflorestamento, eficiencia]
 *           description: Tipo de projeto
 *         descricao:
 *           type: string
 *           description: Descrição do projeto
 *         saldoToken:
 *           type: number
 *           description: Saldo de tokens associado ao projeto
 */

/**
 * @swagger
 * /api/projeto:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projeto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Projeto'
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 projeto:
 *                   $ref: '#/components/schemas/Projeto'
 *       500:
 *         description: Erro ao criar projeto
 */
router.post('/', authenticate, authorize(['admin','empresa','individuo']), projetoController.criarProjeto)

/**
 * @swagger
 * /api/projeto:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projeto]
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projeto'
 *       500:
 *         description: Erro ao listar projetos
 */
router.get('/', authenticate, authorize(['admin','empresa','individuo']), projetoController.getProjetos)

/**
 * @swagger
 * /api/projeto/{id}:
 *   get:
 *     summary: Retorna um projeto pelo ID
 *     tags: [Projeto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projeto'
 *       404:
 *         description: Projeto não encontrado
 *       500:
 *         description: Erro ao buscar projeto
 */
router.get('/:id', authenticate, authorize(['admin','empresa','individuo']), projetoController.getProjetoId)

/**
 * @swagger
 * /api/projeto/{id}:
 *   put:
 *     summary: Atualiza um projeto
 *     tags: [Projeto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Projeto'
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedProjeto:
 *                   $ref: '#/components/schemas/Projeto'
 *       404:
 *         description: Projeto não encontrado
 *       500:
 *         description: Erro ao atualizar projeto
 */
router.put('/:id', authenticate, authorize(['admin','empresa','individuo']), projetoController.updateProjeto)

/**
 * @swagger
 * /api/projeto/{id}:
 *   delete:
 *     summary: Deleta um projeto pelo ID
 *     tags: [Projeto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do projeto a ser deletado
 *     responses:
 *       200:
 *         description: Projeto deletado com sucesso
 *       404:
 *         description: Projeto não encontrado
 *       500:
 *         description: Erro ao deletar projeto
 */
router.delete('/:id', authenticate, authorize(['admin','empresa','individuo']), projetoController.deleteProjetoById)

module.exports = router
