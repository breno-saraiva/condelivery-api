import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class LoginController {
  static async realizarLogin(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const morador = await prisma.morador.findUnique({
        where: { email: email },
      });

      if (morador) {
        const passwordMatch = await bcrypt.compare(senha, morador.senha);
        if (!passwordMatch) {
          return res.status(400).json({ message: 'Usuário e/ou senha inválidos' });
        }

        const token = jwt.sign(
          {
            tipo_usuario: 'morador',
            nome_usuario: morador.nome,
            email_usuario: morador.email,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: '1d' },
        );

        return res.status(200).json({
          token,
          id_usuario: morador.id,
          nome_usuario: morador.nome,
          tipo_usuario: 'morador',
          email_usuario: morador.email,
        });
      }

      const condominio = await prisma.condominio.findUnique({
        where: { emailAdm: email },
      });

      if (condominio) {
        const passwordMatch = await bcrypt.compare(senha, condominio.senhaAdm);
        if (!passwordMatch) {
          return res.status(400).json({ message: 'Usuário e/ou senha inválidos' });
        }

        const token = jwt.sign(
          {
            tipo_usuario: 'condominio',
            nome_usuario: condominio.nomeAdm,
            email_usuario: condominio.emailAdm,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: '1d' },
        );

        return res.status(200).json({
          token,
          id_usuario: condominio.id,
          nome_usuario: condominio.nomeAdm,
          tipo_usuario: 'condominio',
          email_usuario: condominio.emailAdm,
        });
      }

      return res.status(400).json({ message: 'Usuário e/ou senha inválidos' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: `${error} - Falha ao realizar login` });
    }
  }
}

export default LoginController;
