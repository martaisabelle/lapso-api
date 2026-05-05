// Aula 12: express.Router() — separação de rotas por entidade
import { Router } from 'express';
import {
  listarMenus,
  buscarMenuPorId,
  criarMenu,
  atualizarMenu,
  deletarMenu,
} from '../controllers/menu.controller.js';

const router = Router();

// Aula 9: verbos HTTP mapeados para operações CRUD
router.get('/', listarMenus);
router.get('/:id', buscarMenuPorId);
router.post('/', criarMenu);
router.put('/:id', atualizarMenu);
router.delete('/:id', deletarMenu);

export default router;
