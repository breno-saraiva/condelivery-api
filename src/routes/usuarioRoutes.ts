import { Router } from 'express';
import { getUsuarios, criarUsuario } from '../controllers/usuarioController';

const router = Router();

router.get('/', getUsuarios);
router.post('/', criarUsuario);

export default router;
