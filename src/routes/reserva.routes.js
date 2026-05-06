// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors
// Aula 15: Controller agora é uma classe estática
import { Router } from 'express';
import ReservaController from '../controllers/reserva.controller.js';
import { createReservaValidation, reservaIdValidation } from '../validators/reserva.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', ReservaController.getAll);
router.get('/:id', reservaIdValidation, handleValidationErrors, ReservaController.getById);
router.post('/', createReservaValidation, handleValidationErrors, ReservaController.create);
router.put('/:id', reservaIdValidation, handleValidationErrors, ReservaController.update);
router.delete('/:id', reservaIdValidation, handleValidationErrors, ReservaController.delete);

export default router;
