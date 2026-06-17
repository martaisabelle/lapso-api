// Aula 12: express.Router()
// Aula 13: validators e handleValidationErrors
// Aula 15: Controller agora é uma classe estática
// Aula 17: documentação Swagger
// Aula 18: autenticação JWT
// Aula 19: autorização por papéis (RBAC)
import { Router } from 'express';
import MenuController from '../controllers/menu.controller.js';
import { createMenuValidation, menuIdValidation } from '../validators/menu.validator.js';
import { handleValidationErrors } from '../middlewares/validation.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import checkRole from '../middlewares/permission.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Lista todos os menus
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Lista de menus retornada com sucesso
 */
router.get('/', MenuController.getAll);

/**
 * @swagger
 * /api/menus/{id}:
 *   get:
 *     summary: Busca um menu por ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu encontrado
 *       404:
 *         description: Menu não encontrado
 */
router.get('/:id', menuIdValidation, handleValidationErrors, MenuController.getById);

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Cria um novo menu (admin)
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, tipo, tema, numeroCursos, temporada, preco]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Raiz
 *               tipo:
 *                 type: string
 *                 enum: [degustacao, executivo]
 *               tema:
 *                 type: string
 *               numeroCursos:
 *                 type: number
 *               temporada:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Menu criado com sucesso
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Acesso negado
 */
router.post('/', authMiddleware, checkRole('admin'), createMenuValidation, handleValidationErrors, MenuController.create);

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Atualiza um menu (admin)
 *     tags: [Menus]
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
 *         description: Menu atualizado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Acesso negado
 */
router.put('/:id', authMiddleware, checkRole('admin'), menuIdValidation, handleValidationErrors, MenuController.update);

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Deleta um menu (admin)
 *     tags: [Menus]
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
 *         description: Menu deletado
 *       401:
 *         description: Token não fornecido
 *       403:
 *         description: Acesso negado
 */
router.delete('/:id', authMiddleware, checkRole('admin'), menuIdValidation, handleValidationErrors, MenuController.delete);

export default router;