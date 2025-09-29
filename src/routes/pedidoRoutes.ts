import express from 'express';
import PedidoController from '../controllers/pedidoController.js';

const routes = express.Router();

routes.get('/pedidos', PedidoController.listarPedidos);
routes.get('/pedidos/:id', PedidoController.listarPedidoPorId);
routes.post('/pedidos', PedidoController.cadastrarPedido);
routes.put('/pedidos/:id', PedidoController.atualizarPedido);
routes.delete('/pedidos/:id', PedidoController.excluirPedido);

export default routes;
