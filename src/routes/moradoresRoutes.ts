import { Router } from 'express';
import MoradorController from '../controllers/moradorController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Moradores
 *   description: Gerenciamento de moradores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Morador:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         cpf:
 *           type: string
 *           example: "123.456.789-00"
 *         celular:
 *           type: string
 *           example: "(11) 98888-7777"
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *         dataNascimento:
 *           type: string
 *           format: date
 *           example: "1999-07-10"
 *         unidade:
 *           type: string
 *           example: "Bloco B - Apt 302"
 *         ehEntregador:
 *           type: boolean
 *           example: true
 *         senha:
 *           type: string
 *           example: "********"
 *         moradorDesde:
 *           type: string
 *           format: date-time
 *           example: "2024-02-15T14:30:00Z"
 *         condominioId:
 *           type: integer
 *           example: 2
 *         condominio:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 2
 *             nome:
 *               type: string
 *               example: "Residencial Sol Nascente"
 */

/**
 * @swagger
 * /moradores:
 *   post:
 *     summary: Cadastra um novo morador
 *     tags: [Moradores]
 *     parameters:
 *       - in: query
 *         name: condominioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio ao qual o morador pertence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               cpf:
 *                 type: string
 *                 example: "000.000.000-00"
 *               celular:
 *                 type: string
 *                 example: "(00) 00000-0000"
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *                 example: "1999-10-07"
 *               unidade:
 *                 type: string
 *                 example: "Apt 302"
 *               ehEntregador:
 *                 type: boolean
 *                 example: true
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Morador cadastrado com sucesso
 *       400:
 *         description: Falha no cadastro
 */
router.post('/moradores', MoradorController.cadastrarMorador);

/**
 * @swagger
 * /moradores:
 *   get:
 *     summary: Lista morador por ID do Condomínio
 *     tags: [Moradores]
 *     parameters:
 *       - in: path
 *         name: condominioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Morador encontrado
 *       400:
 *         description: Morador não encontrado
 */
router.get('/moradores', MoradorController.listarMoradores);

/**
 * @swagger
 * /moradores/{id}:
 *   put:
 *     summary: Atualiza dados do morador
 *     tags: [Moradores]
 */
router.put('/moradores/:id', MoradorController.atualizarMorador);

/**
 * @swagger
 * /moradores/{id}:
 *   delete:
 *     summary: Exclui morador
 *     tags: [Moradores]
 */
router.delete('/moradores/:id', MoradorController.excluirMorador);

export default router;
