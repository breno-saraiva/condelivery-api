import { prisma } from '../prismaClient';
import { Request, Response } from 'express';

class MoradorController {
  static async listarMoradorPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const moradorEncontrado = await prisma.morador.findUnique({
        where: { id },
        include: { pedidos: true },
      });

      if (!moradorEncontrado) {
        return res.status(400).json({ message: 'Morador não encontrado' });
      }

      res.status(200).json(moradorEncontrado);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao listar morador por id` });
    }
  }

  static async cadastrarMorador(req: Request, res: Response) {
    try {
      const condominioId = Number(req.query.condominioId);

      if (!condominioId) {
        return res.status(400).json({ message: 'CondomínioId é obrigatório' });
      }

      const novoMorador = await prisma.morador.create({
        data: {
          ...req.body,
          condominioId,
        },
      });

      res.status(201).json({ morador: novoMorador });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao cadastrar morador` });
    }
  }

  // Atualizar morador
  static async atualizarMorador(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const moradorAtualizado = await prisma.morador.update({
        where: { id },
        data: req.body,
      });

      res.status(200).json({ message: 'Morador atualizado', morador: moradorAtualizado });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao atualizar morador` });
    }
  }

  static async excluirMorador(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await prisma.morador.delete({ where: { id } });

      res.status(200).json({ message: 'Morador excluído' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao excluir morador` });
    }
  }
}

export default MoradorController;
