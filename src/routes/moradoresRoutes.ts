import { Router } from 'express';
import MoradorController from '../controllers/moradorController';
import { autenticarToken } from '../middleware/authMiddleware';

const routes = Router();

routes.get('/moradores/:id', autenticarToken, MoradorController.listarMoradorPorId);
routes.post('/moradores', autenticarToken, MoradorController.cadastrarMorador);
routes.put('/moradores/:id', autenticarToken, MoradorController.atualizarMorador);
routes.delete('/moradores/:id', autenticarToken, MoradorController.excluirMorador);
routes.delete('/moradores/:id', autenticarToken, MoradorController.excluirMorador);

export default routes;
