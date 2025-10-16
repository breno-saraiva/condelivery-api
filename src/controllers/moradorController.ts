import { prisma } from '../prismaClient';
import { Request, Response } from 'express';
// import { parseDateBR } from '../types/parseDate';
import bcrypt from 'bcrypt';

class MoradorController {
  static async listarMoradores(req: Request, res: Response) {
    try {
      const condominioId = Number(req.query.condominioId);

      const moradoresEncontrado = await prisma.morador.findMany({
        where: { condominioId: condominioId },
      });

      if (!moradoresEncontrado) {
        return res.status(400).json({ message: 'Moradores não encontrado' });
      }

      res.status(200).json(
        moradoresEncontrado.map((item) => ({
          condominioId: item.condominioId,
          id: item.id,
          nome: item.nome,
          cpf: item.cpf,
          celular: item.celular,
          email: item.email,
          dataNascimento: item.dataNascimento,
          unidade: item.unidade,
          ehEntregador: item.ehEntregador,
        })),
      );
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

      const { nome, cpf, celular, email, dataNascimento, unidade, ehEntregador, senha } = req.body;

      const passwordHash = await bcrypt.hash(senha, 10);

      const novoMorador = await prisma.morador.create({
        data: {
          nome,
          cpf,
          celular,
          email,
          dataNascimento,
          unidade,
          ehEntregador,
          senha: passwordHash,
          condominioId,
        },
      });

      res.status(201).json({
        morador: {
          nome: novoMorador.nome,
          email: novoMorador.email,
          unidade: novoMorador.unidade,
          ehEntregador: novoMorador.ehEntregador,
        },
      });
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

      const { nome, cpf, celular, email, dataNascimento, unidade, ehEntregador, senha } = req.body;

      const moradorAtualizado = await prisma.morador.update({
        where: { id },
        data: {
          nome,
          cpf,
          celular,
          email,
          dataNascimento,
          unidade,
          ehEntregador,
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
