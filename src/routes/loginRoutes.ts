import { Router } from 'express';
import LoginController from '../controllers/loginController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Endpoints de autenticação e geração de tokens JWT
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login de morador ou condomínio
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@email.com"
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Retorna um token JWT se o login for bem-sucedido
 *       400:
 *         description: Usuário e/ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', LoginController.realizarLogin);

export default router;
