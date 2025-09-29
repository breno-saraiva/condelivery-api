import { Router } from 'express';
import MoradorController from '../controllers/moradorController';

const routes = Router();

routes.get('/moradores/:id', MoradorController.listarMoradorPorId);
routes.post('/moradores/', MoradorController.cadastrarMorador);
routes.put('/moradores/:id', MoradorController.atualizarMorador);
routes.delete('/moradores/:id', MoradorController.excluirMorador);
routes.delete('/moradores/:id', MoradorController.excluirMorador);

export default routes;
