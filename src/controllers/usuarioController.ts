import { Request, Response } from 'express';
import { prisma } from '../prismaClient';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
};

export const criarUsuario = async (req: Request, res: Response) => {
  const { nome, email } = req.body;
  const usuario = await prisma.usuario.create({
    data: { nome, email },
  });
  res.status(201).json(usuario);
};
