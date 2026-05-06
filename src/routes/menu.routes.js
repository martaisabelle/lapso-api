// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors
// Aula 15: Controller agora é uma classe estática
import { Router } from 'express';
import MenuController from '../controllers/menu.controller.js';
import { createMenuValidation, menuIdValidation } from '../validators/menu.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', MenuController.getAll);
router.get('/:id', menuIdValidation, handleValidationErrors, MenuController.getById);
router.post('/', createMenuValidation, handleValidationErrors, MenuController.create);
router.put('/:id', menuIdValidation, handleValidationErrors, MenuController.update);
router.delete('/:id', menuIdValidation, handleValidationErrors, MenuController.delete);

export default router;
