import express from 'express';
import PedidoController from '../controllers/pedidoController';
import { autenticarToken } from '../middleware/authMiddleware';

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints relacionados aos pedidos realizados pelos moradores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         plataforma:
 *           type: string
 *           example: "iFood"
 *         descricao:
 *           type: string
 *           example: "Combo sanduíche + batata"
 *         previsaoChegada:
 *           type: string
 *           format: date-time
 *           example: "2025-10-07T20:58:17.912Z"
 *         localEntrega:
 *           type: string
 *           example: "Portaria principal"
 *         status:
 *           type: string
 *           example: "Aguardando chegada"
 *         moradorId:
 *           type: integer
 *           example: 4
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos cadastrados
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *       500:
 *         description: Erro ao listar pedidos
 */
routes.get('/pedidos', autenticarToken, PedidoController.listarPedidos);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Lista todos os pedidos de um morador específico
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do morador
 *     responses:
 *       200:
 *         description: Lista de pedidos do morador retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro ao listar pedidos por moradorId
 */
routes.get('/pedidos/:id', autenticarToken, PedidoController.listarPedidoPorId);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cadastra um novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: moradorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do morador que está realizando o pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plataforma:
 *                 type: string
 *                 example: "iFood"
 *               descricao:
 *                 type: string
 *                 example: "Combo sanduíche"
 *               previsaoChegada:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-07T20:58:17.912Z"
 *               localEntrega:
 *                 type: string
 *                 example: "Bloco A"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: MoradorId é obrigatório
 *       500:
 *         description: Falha ao cadastrar pedido
 */
routes.post('/pedidos', autenticarToken, PedidoController.cadastrarPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Atualiza um pedido existente
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               status: "Entregue"
 *               localEntrega: "Portaria 2"
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       500:
 *         description: Falha ao atualizar pedido
 */
routes.put('/pedidos/:id', autenticarToken, PedidoController.atualizarPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Exclui um pedido pelo ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido excluído com sucesso
 *       500:
 *         description: Falha ao excluir pedido
 */
routes.delete('/pedidos/:id', autenticarToken, PedidoController.excluirPedido);

export default routes;
