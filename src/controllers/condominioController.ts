import { prisma } from '../prismaClient';
import { Request, Response } from 'express';

class CondominioController {
  static async listarCondominioPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const condominioEncontrado = await prisma.condominio.findUnique({
        where: { id },
        include: { moradores: true },
      });

      if (!condominioEncontrado) {
        return res.status(400).json({ message: 'Condomínio não encontrado' });
      }

      res.status(200).json(condominioEncontrado);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao listar condomínio por id` });
    }
  }

  static async cadastrarCondominio(req: Request, res: Response) {
    try {
      const novoCondominio = await prisma.condominio.create({
        data: req.body,
      });

      res.status(201).json({ condominio: novoCondominio });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao cadastrar condomínio` });
    }
  }

  static async atualizarCondominio(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const condominioAtualizado = await prisma.condominio.update({
        where: { id },
        data: req.body,
      });

      res.status(200).json({ message: 'Condomínio atualizado', condominio: condominioAtualizado });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao atualizar condomínio` });
    }
  }

  static async excluirCondominio(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await prisma.condominio.delete({ where: { id } });

      res.status(200).json({ message: 'Condomínio excluído' });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Falha ao excluir condomínio` });
    }
  }
}

export default CondominioController;
