import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient';

export interface JwtPayloadCustom {
  tipo_usuario: 'morador' | 'condominio';
  nome_usuario: string;
  email_usuario: string;
  iat?: number;
  exp?: number;
}

export const autenticarToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadCustom;

    if (payload.tipo_usuario === 'morador') {
      const morador = await prisma.morador.findUnique({ where: { email: payload.email_usuario } });
      if (!morador) return res.status(401).json({ message: 'Usuário não encontrado' });
    } else {
      const cond = await prisma.condominio.findUnique({
        where: { emailAdm: payload.email_usuario },
      });
      if (!cond) return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
