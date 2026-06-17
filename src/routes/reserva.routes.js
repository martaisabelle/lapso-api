// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors
// Aula 15: Controller agora é uma classe estática
// Aula 18: autenticação JWT
// Aula 19: autorização por papéis (RBAC)
import { Router } from 'express';
import ReservaController from '../controllers/reserva.controller.js';
import { createReservaValidation, reservaIdValidation } from '../validators/reserva.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/permission.middleware.js';

const router = Router();

// Rotas públicas — qualquer um pode ver as reservas
router.get('/', ReservaController.getAll);
router.get('/:id', reservaIdValidation, handleValidationErrors, ReservaController.getById);

// Rotas protegidas — apenas admin pode criar, editar e deletar
router.post('/', authMiddleware, checkRole('admin'), createReservaValidation, handleValidationErrors, ReservaController.create);
router.put('/:id', authMiddleware, checkRole('admin'), reservaIdValidation, handleValidationErrors, ReservaController.update);
router.delete('/:id', authMiddleware, checkRole('admin'), reservaIdValidation, handleValidationErrors, ReservaController.delete);

export default router;