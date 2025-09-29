import { prisma } from '../prismaClient';
import { Response, Request } from 'express';

class PedidoController {
  static async listarPedidos(req: Request, res: Response) {
    try {
      const pedidosEncontrados = await prisma.pedido.findMany();
      res.status(200).json(pedidosEncontrados);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao listar pedidos` });
    }
  }

  static async listarPedidoPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const pedidoEncontrado = await prisma.pedido.findUnique({
        where: { id },
      });

      if (!pedidoEncontrado) {
        return res.status(400).json({ message: 'Pedido não encontrado' });
      }

      res.status(200).json(pedidoEncontrado);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao listar pedido por id` });
    }
  }

  static async cadastrarPedido(req: Request, res: Response) {
    try {
      const moradorId = Number(req.query.moradorId);

      if (!moradorId) {
        return res.status(400).json({ message: 'MoradorId é obrigatório' });
      }

      const novoPedido = await prisma.pedido.create({
        data: {
          ...req.body,
          status: 'Aguardando chegada',
          moradorId,
        },
      });

      res.status(201).json({ pedido: novoPedido });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao cadastrar pedido` });
    }
  }

  static async atualizarPedido(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const pedidoAtualizado = await prisma.pedido.update({
        where: { id },
        data: req.body,
      });

      res.status(200).json({ message: 'Pedido atualizado', pedido: pedidoAtualizado });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao atualizar pedido` });
    }
  }

  static async excluirPedido(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await prisma.pedido.delete({ where: { id } });

      res.status(200).json({ message: 'Pedido excluído' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao excluir pedido` });
    }
  }
}

export default PedidoController;
