// Aula 18: rotas web — separadas das rotas da API JSON
// Retornam HTML renderizado pelo servidor (SSR com PUG)
import { Router } from 'express';
import WebController from '../controllers/web.controller.js';

const router = Router();

router.get('/menus-view', WebController.listMenusPage);
router.get('/reservas-view', WebController.listReservasPage);

export default router;
