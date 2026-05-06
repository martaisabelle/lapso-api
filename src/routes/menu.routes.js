// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors como middlewares intermediários
import { Router } from 'express';
import {
  listarMenus,
  buscarMenuPorId,
  criarMenu,
  atualizarMenu,
  deletarMenu,
} from '../controllers/menu.controller.js';
import { createMenuValidation, menuIdValidation } from '../validators/menu.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';

const router = Router();

// Fluxo: validator → handleValidationErrors → controller
router.get('/', listarMenus);
router.get('/:id', menuIdValidation, handleValidationErrors, buscarMenuPorId);
router.post('/', createMenuValidation, handleValidationErrors, criarMenu);
router.put('/:id', menuIdValidation, handleValidationErrors, atualizarMenu);
router.delete('/:id', menuIdValidation, handleValidationErrors, deletarMenu);

export default router;
