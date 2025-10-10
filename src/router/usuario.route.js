const express = require('express')
const usuarioController = require('../controllers/usuario.controller')
const {authenticate, authorize} = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: API para gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuário:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do usuário (gerado automaticamente)
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         perfil:
 *           type: string
 *           enum: [empresa, individuo]
 *           description: Método de login
 *         senha:
 *           type: string
 *           description: Senha do usuário (não será retornada)
 *         walletAddress:
 *            type: string
 *            default: null
 *            description: Outro método de login
 *         token:
 *           type: string
 *           description: Token JWT gerado para autenticação
 */

/**
 * @swagger
 * /api/usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/', usuarioController.criarUsuario)

/**
 * @swagger
 * /api/usuario/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *       400:
 *         description: E-mail ou senha incorretos
 *       500:
 *         description: Erro ao realizar login
 */
router.post('/login', usuarioController.login)

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao listar usuários
 */
router.get('/', authenticate, authorize('admin'), usuarioController.getUsuarios)

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar o usuário
 */
router.get('/:id', authenticate, authorize(['individuo','empresa','admin']), usuarioController.getUsuarioId)

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedUser:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido ou dados do usuário incorretos
 *       500:
 *         description: Erro ao atualizar o usuário
 */
router.put('/:id', authenticate, authorize('admin'), usuarioController.updateUsuario)

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar o usuário
 */
router.delete('/:id', authenticate, authorize('admin'), usuarioController.deleteUsuarioId)

module.exports = router