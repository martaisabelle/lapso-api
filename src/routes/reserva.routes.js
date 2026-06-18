// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors
// Aula 15: Controller agora é uma classe estática
// Aula 17: documentação Swagger
// Aula 18: autenticação JWT
// Aula 19: autorização por papéis (RBAC)
import { Router } from 'express';
import ReservaController from '../controllers/reserva.controller.js';
import { createReservaValidation, reservaIdValidation } from '../validators/reserva.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/permission.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Lista todas as reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Lista de reservas retornada com sucesso
 */
router.get('/', ReservaController.getAll);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Busca uma reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva não encontrada
 */
router.get('/:id', reservaIdValidation, handleValidationErrors, ReservaController.getById);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Cria uma nova reserva (admin)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nomeCliente, email, telefone, data, horario, numeroPessoas, menuId]
 *             properties:
 *               nomeCliente:
 *                 type: string
 *                 example: Ana Lima
 *               email:
 *                 type: string
 *                 example: ana@email.com
 *               telefone:
 *                 type: string
 *                 example: "(11) 99999-0000"
 *               data:
 *                 type: string
 *                 example: "2026-08-15"
 *               horario:
 *                 type: string
 *                 example: "20:00"
 *               numeroPessoas:
 *                 type: number
 *                 example: 2
 *               menuId:
 *                 type: string
 *                 example: 6a33033e70adbcdce42fc186
 *               harmonizacao:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Acesso negado
 */
router.post('/', authMiddleware, checkRole('admin'), createReservaValidation, handleValidationErrors, ReservaController.create);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Atualiza uma reserva (admin)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva atualizada
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', authMiddleware, checkRole('admin'), reservaIdValidation, handleValidationErrors, ReservaController.update);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Deleta uma reserva (admin)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva deletada
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', authMiddleware, checkRole('admin'), reservaIdValidation, handleValidationErrors, ReservaController.delete);

export default router;