// Aula 12: express.Router() — separação de rotas por entidade
import { Router } from 'express';
import {
  listarReservas,
  buscarReservaPorId,
  criarReserva,
  atualizarReserva,
  deletarReserva,
} from '../controllers/reserva.controller.js';

const router = Router();

router.get('/', listarReservas);
router.get('/:id', buscarReservaPorId);
router.post('/', criarReserva);
router.put('/:id', atualizarReserva);
router.delete('/:id', deletarReserva);

export default router;
