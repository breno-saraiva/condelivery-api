import { Request, Response } from 'express';
import { prisma } from '../prismaClient';

class LoginController {
  static async realizarLogin(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const morador = await prisma.morador.findFirst({
        where: { email: email, senha: senha },
      });

      if (morador) {
        return res.status(200).json({
          id_usuario: morador.id,
          tipo_usuario: 'morador',
          nome_usuario: morador.nome,
        });
      }

      const condominio = await prisma.condominio.findFirst({
        where: { emailAdm: email, senhaAdm: senha },
      });

      if (condominio) {
        return res.status(200).json({
          id_usuario: condominio.id,
          tipo_usuario: 'condominio',
          nome_usuario: condominio.nomeAdm,
        });
      }

      return res.status(400).json({ message: 'Usuário e/ou senha inválidos' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: `${error.message} - Falha ao realizar login` });
    }
  }
}

export default LoginController;
