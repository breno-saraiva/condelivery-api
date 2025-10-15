import express from 'express';
import CondominioController from '../controllers/condominioController';
import { autenticarToken } from '../middleware/authMiddleware';

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Condomínios
 *   description: Gerenciamento de Condominios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Condominio:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Residencial Sol Nascente"
 *         cnpj:
 *           type: string
 *           example: "12.345.678/0001-99"
 *         cep:
 *           type: string
 *           example: "12345-678"
 *         bairro:
 *           type: string
 *           example: "Centro"
 *         logradouro:
 *           type: string
 *           example: "Rua das Palmeiras"
 *         numero:
 *           type: string
 *           example: "250"
 *         complemento:
 *           type: string
 *           example: "Bloco A"
 *         estado:
 *           type: string
 *           example: "SP"
 *         municipio:
 *           type: string
 *           example: "São Paulo"
 *         nomeAdm:
 *           type: string
 *           example: "Carlos Andrade"
 *         cpfAdm:
 *           type: string
 *           example: "123.456.789-10"
 *         celularAdm:
 *           type: string
 *           example: "(11) 99999-9999"
 *         emailAdm:
 *           type: string
 *           example: "adm@solnascente.com"
 *         senhaAdm:
 *           type: string
 *           example: "********"
 *         moradores:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 */

/**
 * @swagger
 * /api/condominios/{id}:
 *   get:
 *     summary: Lista um condomínio pelo ID, incluindo seus moradores
 *     tags: [Condomínios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Condomínio encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condominio'
 *       400:
 *         description: Condomínio não encontrado
 *       500:
 *         description: Falha ao listar condomínio por ID
 */
routes.get('/condominios/:id', autenticarToken, CondominioController.listarCondominioPorId);

/**
 * @swagger
 * /api/condominios:
 *   post:
 *     summary: Cadastra um novo condomínio
 *     tags: [Condomínios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cnpj
 *               - cep
 *               - bairro
 *               - logradouro
 *               - numero
 *               - estado
 *               - municipio
 *               - nomeAdm
 *               - cpfAdm
 *               - celularAdm
 *               - emailAdm
 *               - senhaAdm
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Residencial Sol Nascente"
 *               cnpj:
 *                 type: string
 *                 example: "12.345.678/0001-99"
 *               cep:
 *                 type: string
 *                 example: "12345-678"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               logradouro:
 *                 type: string
 *                 example: "Rua das Palmeiras"
 *               numero:
 *                 type: string
 *                 example: "250"
 *               complemento:
 *                 type: string
 *                 example: "Bloco A"
 *               estado:
 *                 type: string
 *                 example: "SP"
 *               municipio:
 *                 type: string
 *                 example: "São Paulo"
 *               nomeAdm:
 *                 type: string
 *                 example: "Carlos Andrade"
 *               cpfAdm:
 *                 type: string
 *                 example: "123.456.789-10"
 *               celularAdm:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *               emailAdm:
 *                 type: string
 *                 example: "adm@solnascente.com"
 *               senhaAdm:
 *                 type: string
 *                 example: "minhasenha123"
 *     responses:
 *       201:
 *         description: Condomínio criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Condominio'
 *       400:
 *         description: Já existe um usuário com esse e-mail
 *       500:
 *         description: Falha ao cadastrar condomínio
 */
routes.post('/condominios', CondominioController.cadastrarCondominio);

/**
 * @swagger
 * /api/condominios/{id}:
 *   put:
 *     summary: Atualiza os dados de um condomínio
 *     tags: [Condomínios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               bairro: "Jardins"
 *               celularAdm: "(11) 98888-7777"
 *     responses:
 *       200:
 *         description: Condomínio atualizado com sucesso
 *       500:
 *         description: Falha ao atualizar condomínio
 */
routes.put('/condominios/:id', autenticarToken, CondominioController.atualizarCondominio);

/**
 * @swagger
 * /api/condominios/{id}:
 *   delete:
 *     summary: Exclui um condomínio pelo ID
 *     tags: [Condomínios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do condomínio
 *     responses:
 *       200:
 *         description: Condomínio excluído com sucesso
 *       500:
 *         description: Falha ao excluir condomínio
 */
routes.delete('/condominios/:id', autenticarToken, CondominioController.excluirCondominio);

export default routes;
