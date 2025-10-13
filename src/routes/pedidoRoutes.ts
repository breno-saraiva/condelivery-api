import express from 'express';
import PedidoController from '../controllers/pedidoController';
import { autenticarToken } from '../middleware/authMiddleware';

const routes = express.Router();

routes.get('/pedidos', autenticarToken, PedidoController.listarPedidos);
routes.get('/pedidos/:id', autenticarToken, PedidoController.listarPedidoPorId);
routes.post('/pedidos', autenticarToken, PedidoController.cadastrarPedido);
routes.put('/pedidos/:id', autenticarToken, PedidoController.atualizarPedido);
routes.delete('/pedidos/:id', autenticarToken, PedidoController.excluirPedido);

export default routes;
