// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors
// Aula 15: Controller agora é uma classe estática
// Aula 18: autenticação JWT
// Aula 19: autorização por papéis (RBAC)
import { Router } from 'express';
import MenuController from '../controllers/menu.controller.js';
import { createMenuValidation, menuIdValidation } from '../validators/menu.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/permission.middleware.js';

const router = Router();

// Rotas públicas — qualquer um pode ver os menus
router.get('/', MenuController.getAll);
router.get('/:id', menuIdValidation, handleValidationErrors, MenuController.getById);

// Rotas protegidas — apenas admin pode criar, editar e deletar
router.post('/', authMiddleware, checkRole('admin'), createMenuValidation, handleValidationErrors, MenuController.create);
router.put('/:id', authMiddleware, checkRole('admin'), menuIdValidation, handleValidationErrors, MenuController.update);
router.delete('/:id', authMiddleware, checkRole('admin'), menuIdValidation, handleValidationErrors, MenuController.delete);

export default router;