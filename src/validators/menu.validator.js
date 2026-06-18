// Aula 13: validators/ define O QUE validar — específico para cada entidade
import { body, param } from 'express-validator';
import mongoose from 'mongoose';

export const createMenuValidation = [
  body('tipo')
    .notEmpty().withMessage('O tipo é obrigatório.')
    .isIn(['degustacao', 'executivo']).withMessage("O tipo deve ser 'degustacao' ou 'executivo'."),

  body('nome')
    .trim()
    .notEmpty().withMessage('O nome do menu é obrigatório.')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres.'),

  body('tema')
    .trim()
    .notEmpty().withMessage('O tema do menu é obrigatório.'),

  body('numeroCursos')
    .isInt({ min: 1, max: 20 }).withMessage('O número de cursos deve ser entre 1 e 20.'),

  body('preco')
    .isFloat({ min: 0.01 }).withMessage('O preço deve ser um valor positivo.'),

  body('temporada')
    .notEmpty().withMessage('A temporada é obrigatória.'),

  body('ativo')
    .optional()
    .isBoolean().withMessage('O campo ativo deve ser verdadeiro ou falso.'),
];

export const menuIdValidation = [
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('O ID deve ser um MongoDB ObjectId válido.'),
];