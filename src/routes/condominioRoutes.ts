import express from 'express';
import CondominioController from '../controllers/condominioController';
import { autenticarToken } from '../middleware/authMiddleware';

const routes = express.Router();

routes.get('/condominios/:id', autenticarToken, CondominioController.listarCondominioPorId);
routes.post('/condominios', CondominioController.cadastrarCondominio);
routes.put('/condominios/:id', autenticarToken, CondominioController.atualizarCondominio);
routes.delete('/condominios/:id', autenticarToken, CondominioController.excluirCondominio);

export default routes;
