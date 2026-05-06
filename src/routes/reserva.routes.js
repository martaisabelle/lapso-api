// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors como middlewares intermediários
import { Router } from 'express';
import {
  listarReservas,
  buscarReservaPorId,
  criarReserva,
  atualizarReserva,
  deletarReserva,
} from '../controllers/reserva.controller.js';
import { createReservaValidation, reservaIdValidation } from '../validators/reserva.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';

const router = Router();

router.get('/', listarReservas);
router.get('/:id', reservaIdValidation, handleValidationErrors, buscarReservaPorId);
router.post('/', createReservaValidation, handleValidationErrors, criarReserva);
router.put('/:id', reservaIdValidation, handleValidationErrors, atualizarReserva);
router.delete('/:id', reservaIdValidation, handleValidationErrors, deletarReserva);

export default router;
