import { prisma } from '../prismaClient';
import { Request, Response } from 'express';
import { parseDateBR } from '../types/parseDate';

class MoradorController {
  static async listarMoradorPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const moradorEncontrado = await prisma.morador.findUnique({
        where: { id },
      });

      if (!moradorEncontrado) {
        return res.status(400).json({ message: 'Morador não encontrado' });
      }

      res.status(200).json(moradorEncontrado);
    } catch (error) {
      res.status(500).json({ message: `${error} - Falha ao listar morador por id` });
    }
  }

  static async cadastrarMorador(req: Request, res: Response) {
    try {
      const condominioId = Number(req.query.condominioId);

      if (!condominioId) {
        return res.status(400).json({ message: 'CondomínioId é obrigatório' });
      }

      const { nome, cpf, celular, email, data_nascimento, unidade, ehEntregador, senha } = req.body;

      const novoMorador = await prisma.morador.create({
        data: {
          nome,
          cpf,
          celular,
          email,
          dataNascimento: parseDateBR(data_nascimento),
          unidade,
          ehEntregador: ehEntregador,
          senha,
          condominioId,
        },
      });

      res.status(201).json({ morador: novoMorador });
    } catch (error) {
      res.status(500).json({ message: `${error} - Falha ao cadastrar morador` });
    }
  }

  static async atualizarMorador(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }

      const { nome, cpf, celular, email, data_nascimento, unidade, ehEntregador, senha } = req.body;
      console.log(data_nascimento);

      const moradorAtualizado = await prisma.morador.update({
        where: { id },
        data: {
          nome,
          cpf,
          celular,
          email,
          dataNascimento: data_nascimento ? parseDateBR(data_nascimento) : null,
          unidade,
          ehEntregador: ehEntregador,
          senha,
        },
      });

      res.status(200).json({ message: 'Morador atualizado', morador: moradorAtualizado });
    } catch (error) {
      res.status(500).json({ message: `${error} - Falha ao atualizar morador` });
    }
  }

  static async excluirMorador(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await prisma.morador.delete({ where: { id } });

      res.status(200).json({ message: 'Morador excluído' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Falha ao excluir morador` });
    }
  }
}

export default MoradorController;
