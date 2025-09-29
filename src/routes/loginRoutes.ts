import { Router } from 'express';
import LoginController from '../controllers/loginController';

const routes = Router();
routes.post('login', LoginController.realizarLogin);

export default routes;
